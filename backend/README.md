# 📚 Go Backend User Authentication API

This project is a robust RESTful API for user authentication, built with Go. It features a clean architecture with clear separation of concerns, structured logging, and graceful server management. The API handles user signup, login, and provides a protected endpoint to access user profile information.

---

### ✨ Features

* **User Authentication**: Secure signup and login functionality.
* **JWT Authentication**: Uses JSON Web Tokens for secure, stateless authentication.
* **Secure Password Storage**: Passwords are hashed using `bcrypt` for enhanced security.
* **SQLite Database**: Utilizes a file-based SQLite database for simple and efficient data storage.
* **Request Validation**: Ensures data integrity by validating incoming JSON requests for signup and login.
* **CORS Middleware**: Configured to handle Cross-Origin Resource Sharing.
* **Structured Logging**: Employs the `slog` package for clear and informative logging.
* **Graceful Shutdown**: The server shuts down gracefully on interrupt signals (`SIGINT`, `SIGTERM`) to prevent data loss during termination.

---

### 🛠️ Prerequisites

* Go 1.25.0 or later

---

### 🚀 Getting Started

To get the API up and running, follow these simple steps.

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/ageniouscoder/backend](https://github.com/ageniouscoder/backend)
    cd backend/Backend-535981ce3b9f5080f6e85e580ebea75cc010705b
    ```
2.  **Install dependencies**:
    The project uses Go modules. The required dependencies will be downloaded automatically.
    ```bash
    go mod tidy
    ```
3.  **Create a `.env` file**:
    The application uses environment variables for configuration. Create a `.env` file in the root directory and add the following line:
    ```
    JWT_SECRET=your_secret_key_here
    ```
    You can optionally specify the database address and port in this file:
    ```
    DB_ADDR=./storage/app.db
    PORT=8080
    ```
4.  **Run the application**:
    Start the server. The SQLite database file will be created in the `storage` directory if it doesn't already exist.
    ```bash
    go run ./cmd/myapp/main.go
    ```
    The server will start on `localhost:8080` (or the port specified in your `.env` file).

---

### 📝 API Endpoints

The API interacts with a `User` data model.

#### `POST /signup`
Creates a new user account.

**Request Body:**
```json
{
  "username": "your_username",
  "email": "your.email@example.com",
  "password": "your_password"
}
Success Response (200 OK):

JSON

{
  "id": 123,
  "username": "your_username"
}
Error Response (400 Bad Request):

JSON

{
  "error": "This field is required."
}
POST /login
Authenticates a user and returns a JWT token.

Request Body:

JSON

{
  "identifier": "your_username_or_email",
  "password": "your_password"
}
Success Response (200 OK):

JSON

{
  "login": "succes",
  "token": "your_jwt_token_here"
}
Error Response (401 Unauthorized):

JSON

{
  "error": "Password is Incorrect. Try Again"
}
GET /api/profile
Retrieves the profile of the authenticated user. This is a protected endpoint that requires a valid JWT in the Authorization header.

Request Header:

Authorization: Bearer <your_jwt_token>
Success Response (200 OK):

JSON

{
  "username": "your_username",
  "email": "your.email@example.com",
  "isAdmin": false
}
Error Response (401 Unauthorized):

JSON

{
  "error": "Invalid or expired token"
}
📂 File Structure
.
├── .gitignore
├── cmd/
│   └── myapp/
│       └── main.go               # Main application entry point.
├── go.mod                        # Go module dependencies.
├── go.sum                        # Go module checksums.
└── internal/
    ├── database/
    │   ├── sqlite/
    │   │   └── sqlite.go         # SQLite database implementation.
    │   └── storage.go            # Database interface definition.
    ├── handlers/
    │   ├── auth.go               # Handlers for signup and login.
    │   └── profile.go            # Handler for user profile retrieval.
    ├── jwt/
    │   └── jwt.go                # JWT token generation logic.
    ├── middleware.go/
    │   ├── auth_middleware.go    # Authentication middleware for protected routes.
    │   └── cors_middleware.go    # CORS middleware.
    ├── models/
    │   └── models.go             # Data structures for the application.
    └── utils/
        └── utils.go              # Utility functions for hashing passwords and handling validation errors.
