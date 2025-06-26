# React + Node.js Full Stack Application

A complete product app full-stack web application built with React.js frontend and Node.js/Express backend, featuring user authentication and product management with CRUD operations.

## Features

- **User Authentication**: Simple registration and login system
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete) for products
- **Modern UI**: Clean, responsive design with SweetAlert notifications
- **Real-time Feedback**: Success and error notifications for all operations
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing
- CORS enabled

### Frontend
- React.js 
- React Router DOM for navigation
- Axios for API calls
- SweetAlert2 for notifications
- Bootstrap 5 for responsive UI components and styling
- Bootstrap Icons for modern iconography



## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

