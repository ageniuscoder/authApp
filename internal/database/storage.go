package storage

import "time"

type Storage interface {
	CreateUser(username string, email string, password byte, created_at time.Time) (int64, error)
}
