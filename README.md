# React + Node.js Full Stack Application

A complete full-stack web application built with React.js frontend and Node.js/Express backend, featuring user authentication and product management with CRUD operations.

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
- React.js (v19)
- React Router DOM for navigation
- Axios for API calls
- SweetAlert2 for notifications
- Bootstrap 5 for responsive UI components and styling
- Bootstrap Icons for modern iconography

## Project Structure

```
React-Node/
├── backend/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── ProductList.js
    │   │   ├── ProductForm.js
    │   │   └── Navbar.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

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

## Usage

1. **Register/Login**: Start by creating an account or logging in
2. **View Products**: Navigate to the Products page to see all products
3. **Add Product**: Click "Add New Product" to create a product with name, price, and quantity
4. **Edit Product**: Click "Edit" on any product card to modify it
5. **Delete Product**: Click "Delete" to remove a product (with confirmation)

## Features Implemented

✅ User Registration and Login routes (no authentication required)  
✅ Full CRUD operations for Product model (name, price, quantity)  
✅ MongoDB database integration  
✅ React frontend with modern UI  
✅ Axios for API communication  
✅ SweetAlert notifications for all operations  
✅ Responsive design  
✅ Error handling and validation  
✅ Clean, maintainable code structure  

## Development Notes

- The application uses MongoDB for data persistence
- CORS is enabled for cross-origin requests
- Frontend uses a proxy configuration for development
- All user inputs are validated both client-side and server-side
- SweetAlert2 provides beautiful notifications for all user actions
- The UI is built with a mobile-first approach

## Screenshots

The application includes:
- Modern navigation bar
- Beautiful landing page with gradient hero section
- Clean login/register forms
- Product grid layout with cards
- Responsive product forms
- Success/error notifications with SweetAlert

This is a complete full-stack application suitable for a React developer intern assignment, demonstrating modern web development practices and clean code architecture.