package middleware

import (
	"context"
	"net/http"

	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/domain"
	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/services"
)

type AuthMiddleware struct {
	accountService *services.AccountService
}

func NewAuthMiddleware(accountService *services.AccountService) *AuthMiddleware {
	return &AuthMiddleware{
		accountService: accountService,
	}
}

type contextKey string

const accountKey contextKey = "account"

func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("X-API-KEY")
		if apiKey == "" {
			http.Error(w, "X-API-KEY is required", http.StatusUnauthorized)
			return
		}
		account, err := m.accountService.FindByAPIKey(apiKey)
		if err != nil {
			if err == domain.ErrAccountNotFound {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		ctx := context.WithValue(r.Context(), accountKey, account)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}