# Library Management API

## Overview

Library Management API is a RESTful service designed to manage users and books in a library. It allows you to create, retrieve, and manage users and books, as well as track the borrowing and returning of books. This project leverages Node.js, Express, and Sequelize ORM to provide a robust and scalable API for library management.

## Features

- **User Management**
  - Create, retrieve, and list users
  - Get details of users including their borrowing history
  
- **Book Management**
  - Create, retrieve, and list books
  - Get details of books including average user ratings
  
- **Borrow and Return Books**
  - Allow users to borrow and return books
  - Track book borrowing history and user ratings

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MySQL (or other compatible database)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hadikrkc/nodejs.git
   cd nodejs
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
Create a .env file in the root directory and add the following environment variables:
   ```bash
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=library_management
    PORT=3000
   ```
4. **Create DataBase Tables**
```sql
CREATE TABLE books (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    total_score float DEFAULT '0',
    rating_count int DEFAULT '0',
    is_borrowed tinyint(1) DEFAULT '0',
PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
```sql
CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    created_at datetime DEFAULT NULL,
PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
```sql
CREATE TABLE `borrowed_books` (
  `borrow_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `borrow_date` datetime NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `score` float DEFAULT NULL,
  PRIMARY KEY (`borrow_id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `borrowed_books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `borrowed_books_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

5. **Start the Application**
   ```bash
   npm start
   ```
The API will be running on http://localhost:3000


## API Documentation

The API documentation is available through Swagger UI. To access it, navigate to `http://localhost:3000/api-docs` after starting the server.

### Endpoints

- **Users**
  - `GET /users` - Retrieve a list of users
  - `GET /users/:id` - Retrieve a user by ID
  - `POST /users` - Create a new user

- **Books**
  - `GET /books` - Retrieve a list of books
  - `GET /books/:id` - Retrieve a book by ID
  - `POST /books` - Create a new book

- **Borrow and Return**
  - `POST /users/:id/borrow/:bookId` - Borrow a book
  - `POST /users/:id/return/:bookId` - Return a book with rating