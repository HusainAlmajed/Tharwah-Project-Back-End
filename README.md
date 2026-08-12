# Tharwah-Project-Back-End

## Introduction

Tharwah helps small business owners manage their income and expenses by tracking cash inflows and outflows. It allows users to organize transactions into categories and monitor their business's financial performance.

The backend provides RESTful API routes for authentication, transactions, and categories. It is built using **Node.js, Express, MongoDB, Mongoose, and JWT authentication**.

---

## Repositories

### Frontend Repository

[Tharwah - Frontend](https://github.com/HusainAlmajed/Tharwah-Project-Front-End)

### Backend Repository

[Tharwah - Backend](https://github.com/HusainAlmajed/Tharwah-Project-Back-End)

---

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- CORS
- dotenv
- Morgan

---

## Data Models

The backend contains three main models:

### User

A user account stores the information required for authentication.

Main fields:

- `username`
- `email`
- `password`

### Category

Categories are created by users to organize their transactions.

Main fields:

- `name`
- `type` - `Income` or `Expense`
- `description`
- `owner`

Each category belongs to a user.

### Transaction

Transactions represent money entering or leaving the user's business.

Main fields:

- `name`
- `transactionType` - `Income` or `Expense`
- `amount`
- `date`
- `description`
- `category`
- `owner`

Each transaction belongs to a user and references a category.

---

## API Routes

### Authentication Routes

| HTTP Method | Controller | Response | URI | Use Case |
|---|---|---:|---|---|
| POST | `signUp` | 201 | `/auth/sign-up` | Create a new user account |
| POST | `signIn` | 200 | `/auth/sign-in` | Sign in and receive a JWT |

Authentication routes do not require an existing JWT.

---

### Transaction Routes

| HTTP Method | Controller | Response | URI | Use Case |
|---|---|---:|---|---|
| GET | `index` | 200 | `/transactions` | Get all transactions belonging to the signed-in user |
| GET | `show` | 200 | `/transactions/:transactionId` | Get one transaction |
| POST | `create` | 201 | `/transactions` | Create a new transaction |
| PUT | `update` | 200 | `/transactions/:transactionId` | Update an existing transaction |
| DELETE | `deleteTransaction` | 200 | `/transactions/:transactionId` | Delete a transaction |

All transaction routes are protected and require a valid JWT.

Users can only view, update, and delete transactions that belong to their own account.

When creating or updating a transaction, the selected category must also belong to the signed-in user.

---

### Category Routes

| HTTP Method | Controller | Response | URI | Use Case |
|---|---|---:|---|---|
| GET | `index` | 200 | `/categories` | Get all categories belonging to the signed-in user |
| GET | `show` | 200 | `/categories/:categoryId` | Get one category |
| POST | `create` | 201 | `/categories` | Create a new category |
| PUT | `update` | 200 | `/categories/:categoryId` | Update an existing category |
| DELETE | `deleteCategory` | 200 | `/categories/:categoryId` | Delete a category |

All category routes are protected and require a valid JWT.

Users can only view, update, and delete categories that belong to their own account.

A category cannot be deleted while it is being used by an existing transaction.

---

## Authentication and Authorization

Tharwah uses **JSON Web Tokens (JWT)** for authentication.

After a user signs up or signs in, the backend returns a JWT. Protected requests must include the token in the request headers:

```text
Authorization: Bearer <token>
```

The backend uses the authenticated user's ID to make sure that users can only access and manage their own transactions and categories.

Passwords are hashed using **bcrypt** before being stored in the database.

---

## Getting Started

### Prerequisites

Before running the backend, make sure you have:

- Node.js installed
- npm installed
- A MongoDB database connection

### Installation

1. Clone the backend repository:

```bash
git clone https://github.com/HusainAlmajed/Tharwah-Project-Back-End.git
```

2. Navigate into the project folder:

```bash
cd Tharwah-Project-Back-End
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root of the project and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

5. Start the server:

```bash
npm start
```

By default, the Express server runs on:

```text
http://localhost:3000
```

---

## Project Features Supported by the Backend

- User sign-up
- User sign-in
- JWT authentication
- User ownership authorization
- Create, read, update, and delete transactions
- Create, read, update, and delete categories
- Transaction and category relationship
- User-specific transactions
- User-specific categories
- Protection against deleting categories that are currently being used by transactions