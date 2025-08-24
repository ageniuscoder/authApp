package sqlite

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Sqlite struct {
	Db *sql.DB
}

func New(path string) (*Sqlite, error) {
	db, err := sql.Open("sqlite3", path)
	if err != nil {
		return nil, err
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL UNIQUE,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		role TEXT NOT NULL DEFAULT 'user',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`)

	if err != nil {
		return nil, err
	}

	return &Sqlite{
		Db: db,
	}, nil
}
