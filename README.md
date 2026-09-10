# 🌭 DogLivery

A full-stack hot dog delivery web application built with React, Node.js, Express, MongoDB, and modern web technologies.
DogLivery was developed as a portfolio project to demonstrate the development of a complete food delivery platform, including customer authentication, product management, shopping cart functionality, order management, image uploads, and an administrative dashboard.

## 🚀 Live Demo

**Live Application:**
https://doglivery-1.onrender.com/

## 📸 Overview

DogLivery provides a complete online ordering experience for a hot dog delivery business.

Customers can browse available products, manage their shopping cart, place orders, and track their orders.

Administrators have access to a dedicated dashboard where they can manage products and orders.

---

## ✨ Features

### 👤 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Secure password hashing with bcrypt
* Authentication using HTTP cookies
* Protected routes
* Role-based authorization
* Separate customer and administrator access

### 🌭 Product Management

* Browse available hot dogs and products
* Product categories
* Product descriptions and prices
* Product availability management
* Create products
* Update products
* Delete products
* Product image uploads using Cloudinary

### 🛒 Shopping Cart

* Add products to the cart
* Increase product quantities
* Decrease product quantities
* Remove products
* Clear the cart
* Automatic total price calculation

### 📦 Orders

* Create orders from the shopping cart
* View personal orders
* View individual order details
* Delivery address
* Payment method selection
* Payment status
* Order status management

### 🧑‍💼 Admin Dashboard

Administrators have access to a dedicated management area for:

* Dashboard statistics
* Order management
* Product management
* Creating products
* Editing products
* Managing product availability
* Viewing individual orders
* Viewing customer information

### ☁️ Image Management

Product and profile images are handled through **Cloudinary**, allowing uploaded images to be stored and served through a cloud-based image management service.

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Zustand
* Axios
* Lucide React
* Vite

The frontend is built with React and uses Zustand for client-side state management, Axios for communication with the REST API, React Router for navigation, and Tailwind CSS for the user interface.

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* Cookie Parser
* Multer
* Cloudinary
* Socket.IO
* dotenv

The backend provides the REST API, authentication, authorization, database operations, file uploads, and application business logic.

---

## 🏗️ Project Architecture

The project is organized into separate frontend and backend applications:

```text
DogLivery/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.js
│   ├── package.json
│   └── ...
│
└── package.json
```

The root project provides scripts to install the frontend and backend dependencies and build the frontend application.

---

## 🔐 Authentication Flow

DogLivery uses JWT authentication combined with HTTP cookies.

The authentication flow works approximately as follows:

```text
User
  │
  ▼
Login / Signup
  │
  ▼
Backend Authentication
  │
  ├── Password verification with bcrypt
  │
  └── JWT generation
          │
          ▼
      HTTP Cookie
          │
          ▼
Protected API Routes
```

Protected routes verify the user's authentication token before allowing access to protected resources.

Administrator routes additionally verify the user's role.

---

## 🗄️ Database

DogLivery uses **MongoDB** with **Mongoose** for data modeling and database operations.

The application manages data related to:

* Users
* Products
* Shopping carts
* Orders

Mongoose schemas are used to define the structure and relationships between application data.

---

## 📡 API

The backend exposes REST API endpoints for the main application resources.

Examples include:

```text
/api/auth
/api/products
/api/cart
/api/orders
```

The API is responsible for authentication, product management, shopping cart operations, order creation, order retrieval, and administrative operations.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd DogLivery
```

### 2. Install dependencies

The root project includes a build script that installs dependencies for both the backend and frontend.

```bash
npm run build
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Never commit your `.env` file or expose your secret keys publicly.

### 4. Start the backend

From the root directory:

```bash
npm start
```

Or run the backend directly in development mode:

```bash
cd backend
npm run dev
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will be available through the Vite development server.

---

## 🔧 Available Scripts

### Root

```bash
npm run build
```

Installs dependencies for the backend and frontend and builds the frontend application.

```bash
npm start
```

Starts the backend application.

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

---

## 🌐 Deployment

DogLivery has been deployed using **Render**, making the application available online as a production project.

**Live Demo:**
[Add your Render URL here]

---

## 🎯 Project Goals

The main goal of DogLivery was to build a realistic full-stack application rather than a simple CRUD project.

Through this project, I practiced:

* Building a React application from scratch
* Designing reusable frontend components
* Managing global application state
* Building REST APIs
* Implementing authentication and authorization
* Working with MongoDB and Mongoose
* Implementing role-based access control
* Handling image uploads
* Connecting frontend and backend applications
* Building an administrative dashboard
* Managing real-world e-commerce logic
* Deploying a full-stack application

---

## 📚 What I Learned

Developing DogLivery helped me strengthen my understanding of full-stack application development and how different parts of a modern web application work together.

Some of the main areas I practiced were:

**Frontend architecture**
Building pages, protected routes, reusable components, API integration, and global state management with React and Zustand.

**Backend development**
Creating REST APIs with Node.js and Express and organizing controllers, routes, middleware, models, and application logic.

**Authentication & security**
Implementing JWT authentication, password hashing with bcrypt, HTTP cookies, protected routes, and role-based authorization.

**Database management**
Designing MongoDB schemas with Mongoose and working with relationships between users, products, and orders.

**Cloud services**
Integrating Cloudinary for image management and deploying the application to Render.

---

## 🔮 Future Improvements

Possible future improvements include:

* Online payment integration
* Real-time order updates
* More advanced order tracking
* Additional customer notifications
* Improved analytics for administrators
* Additional product customization options
* Automated testing
* Further UI/UX improvements

---

## 👨‍💻 Author

**Bruno Pires**

Frontend / Full-Stack Developer

* LinkedIn: [linkedin.com/in/bruno-pires-3ba401355/](https://linkedin.com/in/bruno-pires-3ba401355/)
* GitHub: [github.com/bru-lab](https://github.com/bru-lab)

---

## ⭐ Feedback

If you find this project interesting, feel free to explore the code and provide feedback.

⭐ **Thanks for checking out DogLivery!**
