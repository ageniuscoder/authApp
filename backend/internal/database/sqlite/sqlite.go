package sqlite

import (
	"database/sql"
	"strings"

	"github.com/ageniouscoder/myapp/internal/models"
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

func (s *Sqlite) CreateUser(username string, email string, password string, role string) (int64, error) {
	stmt, err := s.Db.Prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()
	res, err := stmt.Exec(username, email, password, role)
	if err != nil {
		return 0, err
	}
	lid, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return lid, nil
}

func (s *Sqlite) LoginUser(identifier string) (*models.User, error) {
	var stmt *sql.Stmt
	var err error

	if strings.Contains(identifier, "@") {
		stmt, err = s.Db.Prepare("SELECT * FROM users WHERE email = ?")
	} else {
		stmt, err = s.Db.Prepare("SELECT * FROM users WHERE username = ?")
	}

	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var user models.User

	err = stmt.QueryRow(identifier).Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.Role, &user.Created_at)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
