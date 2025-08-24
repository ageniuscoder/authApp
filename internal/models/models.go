package models

import "time"

type User struct {
	Id         int64     `json:"id"`
	Username   string    `json:"username"`
	Email      string    `json:"email"`
	Password   string    `json:"-"`
	Role       string    `json:"role"`
	Created_at time.Time `json:"created_at"`
}

type RegisterInput struct {
	Username string `json:"username" binding:"required,min=4,max=20"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Identifier string `json:"identifier" binding:"required"`
	Password   string `json:"password" binding:"required"`
}

type CustomErrorResponse struct {
	Field   string `json:"field"`
	Tag     string `json:"tag"`
	Message string `json:"message"`
}
