# AuthApp: A Full-Stack User Authentication System

AuthApp is a modern and secure full-stack application that provides a robust user authentication system. The backend is a RESTful API built with Go, and the frontend is a dynamic, responsive Single-Page Application (SPA) created with React and Vite. The system is designed for secure, stateless authentication using JSON Web Tokens (JWT).

### ✨ Key Features

**Backend (Go)**
* **User Authentication**: Implements secure user signup and login functionality.
* **JWT Authentication**: Uses JSON Web Tokens for secure, stateless authentication.
* **Secure Password Storage**: Passwords are hashed using `bcrypt` for enhanced security.
* **SQLite Database**: Utilizes a file-based SQLite database for simple and efficient data storage.
* **Request Validation**: Ensures data integrity by validating incoming JSON requests for signup and login.
* **CORS Middleware**: Configured to handle Cross-Origin Resource Sharing from the frontend origin `http://localhost:5173`.
* **Graceful Shutdown**: The server shuts down gracefully on interrupt signals to prevent data loss.

**Frontend (React)**
* **Secure Authentication**: JWT-based authentication with automatic token handling and verification on app load.
* **Protected Routes**: Ensures that authenticated-only pages like the user profile are inaccessible to unauthenticated users via redirects.
* **Form Validation**: Client-side validation for email, password, and name fields on signup and login forms.
* **Modern Design**: Built with Tailwind CSS, the UI features a clean, professional aesthetic with smooth animations and responsive components.

### 🛠️ Prerequisites

* **Go** 1.25.0 or later.
* **Node.js** (for the frontend) - The project uses npm version 3.

### 🚀 Getting Started

To get the application up and running, follow these steps for both the backend and frontend.

#### **Backend Setup**
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies (Go modules will handle this automatically):
    ```bash
    go mod tidy
    ```
3.  Create a `.env` file in the `backend` directory with your JWT secret key. You can also optionally specify the database address and port:
    ```
    JWT_SECRET=your_secret_key_here
    DB_ADDR=./storage/app.db
    PORT=8080
    ```
4.  Run the backend server:
    ```bash
    go run ./cmd/myapp/main.go
    ```
    The server will start on `localhost:8080` (or your specified port) and will create a `storage/app.db` file.

#### **Frontend Setup**
1.  Navigate to the `frontend/my-auth-app` directory:
    ```bash
    cd ../frontend/my-auth-app
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

### 📝 API Endpoints

The backend API provides the following endpoints for authentication and user management:

| Endpoint         | Method | Description                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------ |
| `/signup`        | `POST`   | Creates a new user account.                                              |
| `/login`         | `POST`   | Authenticates a user and returns a JWT token.                            |
| `/api/profile`   | `GET`    | Retrieves the profile of the authenticated user (requires a valid JWT).  |

### 📂 File Structure

The project is organized into two main directories: `backend` for the Go API and `frontend` for the React application.

**Backend Structure**
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
└── utils.go              # Utility functions for password hashing and validation.



**Frontend Structure**
.
├── .gitignore
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
└── src/
├── App.jsx                   # Main application component and router setup.
├── main.jsx                  # Main entry point for the React application.
├── index.css                 # Main CSS file, imports Tailwind.
├── assets/
│   └── react.svg             # React logo.
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx     # Login form component.
│   │   └── SignupForm.jsx    # Signup form component.
│   ├── Common/
│   │   ├── LoadingSpinner.jsx # Loading spinner component.
│   │   └── ProtectedRoute.jsx # HOC for protecting routes.
│   ├── Home/
│   │   └── HomePage.jsx      # Homepage component.
│   ├── Navigation/
│   │   └── Header.jsx        # Navigation header component.
│   └── Profile/
│       └── ProfilePage.jsx   # User profile page component.
├── contexts/
│   ├── Auth.js               # Auth context creator and custom hook.
│   └── AuthContext.jsx       # Auth provider component.
├── services/
│   └── api.js                # Axios instance for API requests.
└── utils/
└── auth.js               # Authentication-related utility functions.







