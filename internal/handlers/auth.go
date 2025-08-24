package auth

import (
	"net/http"
	"strings"

	storage "github.com/ageniouscoder/myapp/internal/database"
	"github.com/ageniouscoder/myapp/internal/models"
	"github.com/ageniouscoder/myapp/internal/utils"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func UserSignup(storage storage.Storage) gin.HandlerFunc {
	return func(c *gin.Context) {
		var regInput models.RegisterInput
		err := c.ShouldBindJSON(&regInput) //parsing req body to struct and validation done
		if err != nil {
			if validationErrors, ok := err.(validator.ValidationErrors); ok {
				c.JSON(http.StatusBadRequest, gin.H{"error": utils.ValidationErr(validationErrors)})
				return
			}
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		encPass, err := utils.HashPass(regInput.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "error encrypting password"})
		}
		lid, err := storage.CreateUser(regInput.Username, regInput.Email, encPass, "user")
		if err != nil {
			if strings.Contains(err.Error(), "UNIQUE constraint failed") {
				c.JSON(http.StatusConflict, gin.H{"error": "This username or Email already exists"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"id": lid, "username": regInput.Username})
	}
}

func UserLogin() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusCreated, gin.H{"message": "user logged In succesfully"})
	}
}
