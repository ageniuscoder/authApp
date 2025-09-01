package auth

import (
	"database/sql"
	"net/http"
	"strings"

	storage "github.com/ageniouscoder/myapp/internal/database"
	jwt1 "github.com/ageniouscoder/myapp/internal/jwt"
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

func UserLogin(storage storage.Storage) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input models.LoginInput
		err := c.ShouldBindJSON(&input)
		if err != nil {
			if validationError, ok := err.(validator.ValidationErrors); ok {
				c.JSON(http.StatusBadRequest, gin.H{"errors": utils.ValidationErr(validationError)})
				return
			}
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := storage.LoginUser(input.Identifier)

		if err != nil {
			if err == sql.ErrNoRows {
				c.JSON(http.StatusNotFound, gin.H{"error": "User is Not registered with US"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		err = utils.MatchPass(input.Password, user.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Password is Incorrect. Try Again"})
			return
		}
		token, err := jwt1.GenrateJwt(user.Username, user.Email, user.Role)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Jwt token is Not Genrated"})
		}

		c.JSON(http.StatusOK, gin.H{"login": "succes", "token": token})
	}
}
