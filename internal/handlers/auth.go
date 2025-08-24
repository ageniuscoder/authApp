package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserSignup() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{"message": "user created succesfully"})
	}
}
