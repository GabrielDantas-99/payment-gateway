package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/dto"
	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/services"
)

type AccountHandler struct {
	accountService *services.AccountService
}

func NewAccountHandler(accountService *services.AccountService) *AccountHandler {
	return &AccountHandler{accountService: accountService}
}

func (h *AccountHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateAccountInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	output, err := h.accountService.CreateAccount(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(output)
}

func (h *AccountHandler) Get(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("X-API-Key")
	if apiKey == "" {
		http.Error(w, "API Key is required", http.StatusUnauthorized)
		return
	}

	output, err := h.accountService.FindByAPIKey(apiKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}