package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		username, exists := c.Get("username")
		if !exists {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "username not found in context"})
			return
		}
		email, exists := c.Get("email")
		if !exists {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "email not found in context"})
			return
		}
		role, exists := c.Get("role")
		if !exists {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "role not found in context"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"username": username,
			"email":    email,
			"isAdmin":  role == "admin",
		})
	}
}
