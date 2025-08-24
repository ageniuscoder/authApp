package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Entry point for the application")

	//env load
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error Loading Env file", err)
	}

	Db_addr := os.Getenv("DB_ADDR")

	if Db_addr == "" {
		Db_addr = "storage/app.db"
	}

	Port := os.Getenv("PORT")

	if Port == "" {
		Port = "8080"
	}
	Jwt_secret := os.Getenv("JWT_SECRET")

	if Jwt_secret == "" {
		log.Fatal("jwt secret key must be set in env file")
	}

	//database setup

	//router setup

	//server setup
}
