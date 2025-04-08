package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/domain"
	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/dto"
	"github.com/GabrielDantas-99/payment-gateway/gateway-api/internal/services"
	"github.com/go-chi/chi/v5"
)

type InvoiceHandler struct {
	service *services.InvoiceService
}

func NewInvoiceHandler(service *services.InvoiceService) *InvoiceHandler {
	return &InvoiceHandler{
		service: service,
	}
}

func getAPIKey(r *http.Request, w http.ResponseWriter) (string, bool) {
	apiKey := r.Header.Get("X-API-KEY")
	if apiKey == "" {
		http.Error(w, "X-API-KEY is required", http.StatusUnauthorized)
		return "", false
	}
	return apiKey, true
}

func (h *InvoiceHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateInvoiceInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	apiKey, ok := getAPIKey(r, w)
	if !ok {
		return
	}
	input.APIKey = apiKey

	output, err := h.service.Create(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(output)
}

func (h *InvoiceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	apiKey, ok := getAPIKey(r, w)
	if !ok {
		return
	}

	output, err := h.service.GetByID(id, apiKey)
	if err != nil {
		switch err {
		case domain.ErrInvoiceNotFound:
			http.Error(w, err.Error(), http.StatusNotFound)
		case domain.ErrAccountNotFound:
			http.Error(w, err.Error(), http.StatusUnauthorized)
		case domain.ErrUnauthorizedAccess:
			http.Error(w, err.Error(), http.StatusForbidden)
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

func (h *InvoiceHandler) ListByAccount(w http.ResponseWriter, r *http.Request) {
	apiKey, ok := getAPIKey(r, w)
	if !ok {
		return
	}

	output, err := h.service.ListByAccountAPIKey(apiKey)
	if err != nil {
		switch err {
		case domain.ErrAccountNotFound:
			http.Error(w, err.Error(), http.StatusUnauthorized)
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}
