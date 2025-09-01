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

	"github.com/ageniouscoder/myapp/internal/database/sqlite"
	auth "github.com/ageniouscoder/myapp/internal/handlers"
	auth_middleware "github.com/ageniouscoder/myapp/internal/middleware.go"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Entry point for the auth application")

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

	//database setup
	db, err := sqlite.New(Db_addr)
	if err != nil {
		log.Fatal("Error Connecting Database", err)
	}

	//router setup

	router := gin.Default()

	// CORS Middleware
	router.Use(auth_middleware.CorsMiddleware())

	router.POST("/signup", auth.UserSignup(db))

	router.POST("/login", auth.UserLogin(db))

	api := router.Group("api", auth_middleware.AuthMiddleware())
	{
		api.GET("/profile", auth.UserProfile())
	}

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
