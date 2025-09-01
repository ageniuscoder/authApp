package jwt1

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

func GenrateJwt(username string, email string, role string) (string, error) {
	Jwt_secret := os.Getenv("JWT_SECRET")
	claims := Claims{
		Username: username,
		Email:    email,
		Role:     role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "myapp",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	jwt_token, err := token.SignedString([]byte(Jwt_secret))

	if err != nil {
		return "", err
	}
	return jwt_token, nil
}
