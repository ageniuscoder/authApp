package storage

import "github.com/ageniouscoder/myapp/internal/models"

type Storage interface {
	CreateUser(username string, email string, password string, role string) (int64, error)
	LoginUser(identifier string) (*models.User, error)
}
