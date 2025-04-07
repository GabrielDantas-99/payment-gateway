# 💳 Gateway de Pagamento

Sistema completo de gateway de pagamento, incluindo geração e processamento de transações, antifraude via micro-serviço, visualização em tempo real e integração com IA para aumento de produtividade e agilidade no desenvolvimento.

---

## 🚀 Features

- ✅ **Criação de contas:** Permite a criação de contas com geração automática de API-key para autenticação.
- 💰 **Geração de faturas (Invoices):** Registro de novas transações com simulação de pagamento via cartão de crédito.
- 🛡️ **Validação antifraude:** Transações acima de um valor definido são analisadas por um micro-serviço de antifraude (via Apache Kafka).
- 📊 **Dashboard em tempo real:** Visualização das transações à medida que são realizadas.
- 🤖 **Integração com IA:** Utilização de IA e Model Context Protocol (MCP) para automação e produtividade durante o desenvolvimento.

---

## 🧰 Tecnologias Utilizadas

| Tecnologia        | Finalidade                                                   |
|-------------------|--------------------------------------------------------------|
| **Go**            | Back-end principal do gateway de pagamento                   |
| **Next.js**       | Interface web e dashboard em tempo real                      |
| **NestJS**        | Micro-serviço de antifraude                                  |
| **Apache Kafka**  | Comunicação assíncrona entre serviços (event-driven)         |
| **Docker**        | Containerização para ambientes consistentes e produtivos     |
| **Cursor**        | IDE com foco em produtividade com suporte a IA               |
| **Model Context Protocol (MCP)** | Integração IA + ferramentas para acelerar o desenvolvimento  |

---

## 🏗️ Arquitetura de Microserviços

- **Gateway de Pagamento** (Go)
- **Serviço de Antifraude** (NestJS)
- Comunicação via **Apache Kafka**
- Front-end em **Next.js** conectado com o gateway
- Containerização com **Docker**

---

## 📦 Entidades

### 🧾 Account

| Campo     | Descrição                                 |
|-----------|--------------------------------------------|
| `name`    | Nome da conta                              |
| `email`   | E-mail do titular                          |
| `balance` | Saldo disponível (somatório de faturas aprovadas) |
| `api_key` | Chave de autenticação (gerada na criação)  |

---

### 💸 Invoice

| Campo           | Descrição                              |
|------------------|------------------------------------------|
| `accountId`      | ID da conta associada                    |
| `amount`         | Valor da fatura                          |
| `status`         | Status da transação (`Pending`, `Approved`, `Rejected`) |
| `description`    | Descrição da transação                   |
| `paymentType`    | Tipo de pagamento                        |
| `cardLastDigits` | Últimos dígitos do cartão utilizado      |

---

### 💳 CreditCard

> Estrutura auxiliar para simulação de pagamento com cartão.

---

## 📡 Endpoints

### 🔐 Gerenciamento de Contas

| Método | Rota         | Descrição                |
|--------|--------------|--------------------------|
| `POST` | `/accounts`  | Criação de nova conta    |
| `GET`  | `/accounts`  | Listagem de contas       |

### 💳 Operações com Invoices (requer `X-API-KEY` no header)

| Método | Rota               | Descrição                     |
|--------|--------------------|-------------------------------|
| `POST` | `/invoices`        | Criação de nova fatura        |
| `GET`  | `/invoices`        | Listagem de faturas           |
| `GET`  | `/invoices/{id}`   | Detalhes de uma fatura        |

---

## 📈 Futuras Melhorias

- Integração com sistemas de pagamento reais (ex: Stripe, Pagar.me)
- Painel administrativo completo
- Análise de risco com Machine Learning
- Limites personalizados por conta

---

## 🧑‍💻 Como Contribuir

1. Faça um fork deste repositório
2. Crie uma branch com sua feature: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para a sua branch: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
