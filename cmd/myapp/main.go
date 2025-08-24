package main

import (
	"context"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	auth "github.com/ageniouscoder/myapp/internal/handlers"
	"github.com/gin-gonic/gin"
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

	router := gin.Default()

	router.POST("/signUp", auth.UserSignup())

	//server setup

	server := &http.Server{
		Addr:    fmt.Sprintf("localhost:%s", Port),
		Handler: router,
	}

	//shutting down server gracefully
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		err = server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log.Fatal("Error connecting server", err)
		}
	}()
	<-done
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = server.Shutdown(ctx)

	if err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}
	slog.Info("Server shutDown gracefully")

}
