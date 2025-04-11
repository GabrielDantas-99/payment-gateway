import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProcessInvoiceFraudDto } from '../dto/process-invoice-fraud.dto';
import { Account, FraudReason, InvoiceStatus } from '@prisma/client';

@Injectable()
export class FraudService {
  constructor(private prismaService: PrismaService) {}
  async processInvoice(processInvoiceFraudDto: ProcessInvoiceFraudDto) {
    const { invoice_id, account_id, amount } = processInvoiceFraudDto;
    const foundInvoice = await this.prismaService.invoice.findUnique({
      where: {
        id: invoice_id,
      },
    });

    if (foundInvoice) {
      throw new Error('Invoice has already been processed');
    }

    const account = await this.prismaService.account.upsert({
      where: {
        id: account_id,
      },
      update: {},
      create: {
        id: account_id,
      },
    });

    const fraudResult = await this.detectFraud({
      account,
      amount,
    });

    const invoice = await this.prismaService.invoice.create({
      data: {
        id: invoice_id,
        accountId: account.id,
        amount,
        ...(fraudResult.hasFraud && {
          fraudHistory: {
            create: {
              reason: fraudResult.reason!,
              description: fraudResult.description,
            },
          },
        }),
        status: fraudResult.hasFraud
          ? InvoiceStatus.REJECTED
          : InvoiceStatus.APPROVED,
      },
    });

    return {
      invoice,
      fraudResult,
    };
  }

  async detectFraud(data: { account: Account; amount: number }) {
    const { account, amount } = data;

    if (account.isSuspicious) {
      return {
        hasFraud: true,
        reason: FraudReason.SUSPICIOUS_ACCOUNT,
        description: 'Account is marked as suspicious',
      };
    }

    const previousInvoices = await this.prismaService.invoice.findMany({
      where: {
        accountId: account.id,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    if (previousInvoices.length) {
      const totalAmount = previousInvoices.reduce(
        (acc, invoice) => acc + invoice.amount,
        0,
      );
      const avarageAmount = totalAmount / previousInvoices.length;

      if (amount > avarageAmount * (1 + 50 / 100) + avarageAmount) {
        return {
          hasFraud: true,
          reason: FraudReason.UNUSUAL_PATTERN,
          description: `Invoice amount ${amount} is too high compared to previous invoices: ${avarageAmount}`,
        };
      }

      const recentDate = new Date();
      recentDate.setHours(recentDate.getHours() - 24);

      const recentInvoices = await this.prismaService.invoice.findMany({
        where: {
          accountId: account.id,
          createdAt: {
            gte: recentDate,
          },
        },
      });

      if (recentInvoices.length >= 100) {
        return {
          hasFraud: true,
          reason: FraudReason.FREQUENT_HIGH_VALUE,
          description: `Account ${account.id} has more than the average amount 100`,
        };
      }
    }

    return {
      hasFraud: false,
    }; // No fraud detected
  }
}
