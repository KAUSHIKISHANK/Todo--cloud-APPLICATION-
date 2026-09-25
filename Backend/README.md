# 📝 MERN Todo Backend API

A secure RESTful Todo Backend built using **Node.js, Express.js, MongoDB, JWT Authentication, and Bcrypt**. This project provides user authentication and authorization, allowing users to manage only their own todos.

---

## 🚀 Features

- User Registration
- User Login
- Password Hashing using Bcrypt
- JWT Authentication
- Authorization using Middleware
- Create Todo
- View Personal Todos
- Update Todo
- Delete Todo
- MongoDB Integration
- Environment Variable Support (.env)

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv
- Postman

---

## 📂 Project Structure

```
Backend
│
├── Middleware
│   └── authmiddleware.js
│
├── src
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── app.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🔐 Authentication Flow

1. User registers with name, email and password.
2. Password is hashed using Bcrypt.
3. User logs in.
4. JWT Token is generated.
5. Client sends the token in the Authorization header.
6. Middleware verifies the token.
7. User can only access their own todos.

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

### Todo APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/todos | Create Todo |
| GET | /api/todos | Get User Todos |
| PATCH | /api/todos/:id | Update Todo |
| DELETE | /api/todos/:id | Delete Todo |

---

## ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into project

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server

```bash
node server.js
```

or

```bash
nodemon server.js
```

---

## 🔒 Security

- Passwords are hashed using Bcrypt.
- JWT is used for Authentication.
- Protected routes are secured using Middleware.
- Users can only access and manage their own todos.
- Sensitive credentials are stored using Environment Variables.

---

## 📷 API Testing

All APIs were tested using **Postman**.

---

## 👨‍💻 Author

**Ishank Kaushik**

B.Tech CSE

Backend Developer

---

## 📜 License

This project is created for educational and learning purposes.