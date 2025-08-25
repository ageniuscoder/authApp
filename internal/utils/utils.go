package utils

import (
	"github.com/ageniouscoder/myapp/internal/models"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

// bcrypt methods
func HashPass(pass string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pass), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func MatchPass(pass string, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(pass))
}

// validation errors
func ValidationErr(err validator.ValidationErrors) []models.CustomErrorResponse {
	var errors []models.CustomErrorResponse
	for _, fieldErr := range err {
		errors = append(errors, models.CustomErrorResponse{
			Field:   fieldErr.Field(),
			Tag:     fieldErr.ActualTag(),
			Message: GetErrorMessage(fieldErr),
		})
	}
	return errors
}

func GetErrorMessage(fe validator.FieldError) string {
	switch fe.ActualTag() {
	case "required":
		return "This field is required."
	case "email":
		return "Invalid email format."
	case "min":
		return "This field must be at least " + fe.Param() + " characters long."
	case "max":
		return "This field cannot be more than " + fe.Param() + " characters long."
	default:
		return "Unknown validation error."
	}
}
