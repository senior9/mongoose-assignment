# mongoose-assignment


# E-commerce API

This is an E-commerce API built with Express, TypeScript, and MongoDB using Mongoose for data management. The API allows for the management of products and orders with validation using Joi.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Validation](#validation)
- [Error Handling](#error-handling)

## Features

- Create, retrieve, update, and delete products
- Create and retrieve orders
- Inventory management
- Validation using Joi

## Prerequisites

- Node.js
- Exopress.js
- Mongoose

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/user-name/mongoose-assignment.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your MongoDB URI:

    ```env
    PORT=YOUR_PORT
    MONGO_URI=your-mongodb-uri
    ```

## Running the Application
### Build Appplication 
To start the application in build mode:

```bash
npm run build
```
### Development

To start the application in development mode:

```bash
npm run start:dev
```
4. **Postman Collection**
To test the API endpoints, you can use Postman.