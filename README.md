# TaskFlow – Cloud-Based Todo Application

## 1. Introduction

TaskFlow is a cloud-based Todo and Task Management application built using the MERN stack. It allows users to register, log in securely, create tasks, update tasks, delete tasks, and manage pending and completed tasks.

The application is deployed on cloud platforms, allowing users to access it from any device with an internet connection without depending on the developer's personal computer.

---

## 2. Application Flow

The application follows a client-server architecture:

```text
User
 │
 ▼
Vercel
React Frontend
 │
 │ REST API Requests
 ▼
Render
Node.js + Express Backend
 │
 │ Database Operations
 ▼
MongoDB Atlas
Cloud Database
Working Flow
The user opens the TaskFlow application through the deployed Vercel URL.
The React frontend provides the user interface for registration, login, dashboard, and task management.
The user registers or logs in through the frontend.
The frontend sends the request to the Node.js/Express backend using REST APIs.
The backend validates the request and handles authentication using JWT and bcrypt.
User information and task data are stored in MongoDB Atlas.
After successful login, the frontend uses the JWT token for authenticated API requests.
When a user creates, updates, completes, or deletes a task, the request is sent to the backend.
The backend performs the required database operation in MongoDB Atlas.
The updated data is returned to the React frontend and displayed to the user.
Since the frontend, backend, and database are hosted using cloud services, the application can be accessed remotely without keeping the developer's computer running.
3. Tech Stack
Frontend
React.js
Vite
JavaScript
HTML5
CSS3
Axios
React Router
Lucide React
Backend
Node.js
Express.js
REST API
JWT
bcrypt
Database
MongoDB
MongoDB Atlas
Cloud & Deployment
Vercel – Frontend Hosting
Render – Backend Hosting
MongoDB Atlas – Cloud Database
Testing & CI/CD
Jest
Supertest
MongoDB Memory Server
GitHub Actions
4. Key Features
User Registration and Login
JWT-based Authentication
Create Tasks
Update Tasks
Delete Tasks
Mark Tasks as Completed
Pending Tasks
Completed Tasks
Task Search
Dashboard Statistics
Cloud Deployment
Automated Backend Testing
5. Cloud Computing Implementation

TaskFlow uses cloud services for the major components of the application.

Component	Service	Purpose
Frontend	Vercel	Hosts the React application
Backend	Render	Runs the Node.js/Express server
Database	MongoDB Atlas	Stores users and tasks
CI/CD	GitHub Actions	Runs automated tests

This makes the application accessible over the internet without requiring the developer's personal computer to remain online.

6. Testing and CI/CD

The backend is tested using Jest and Supertest.

Automated tests cover:

Server availability
Registration validation
Invalid email validation
Password validation
Login validation
Incorrect password handling

GitHub Actions automatically runs the test suite when changes are pushed to the main branch or when a pull request is created.

7. Deployment
Frontend

Live Application:
https://taskflow-tan-sigma.vercel.app/

Backend

Backend:
https://taskflow-r866.onrender.com/

Database

MongoDB Atlas is used as the cloud-hosted database.