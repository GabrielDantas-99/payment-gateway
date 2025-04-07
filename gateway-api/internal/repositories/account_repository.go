package repositories

import (
	"database/sql"

	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/domain"
)

type AccountRepository struct {
	db *sql.DB
}

func NewAccountRepository(db *sql.DB) *AccountRepository {
	return &AccountRepository{db: db}
}

func (r *AccountRepository) Create(account *domain.Account) error {
	statement, err := r.db.Prepare(`
        INSERT INTO accounts (id, name, email, api_key, balance, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `)
	if err != nil {
		return err
	}
	defer statement.Close()

	_, err = statement.Exec(
		account.ID,
		account.Name,
		account.Email,
		account.APIKey,
		account.Balance,
		account.CreatedAt,
		account.UpdatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}
