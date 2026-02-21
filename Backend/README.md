# Uber Clone Backend API Documentation

## User Registration Endpoint

### Route: `/api/users/register`

#### Description
This endpoint allows users to register/create a new account for the Uber Clone application.

#### HTTP Method
**POST**

#### Base URL
```
http://localhost:3000
```

#### Full URL
```
POST http://localhost:3000/api/users/register
```

---

## Request

### Content-Type
```
application/json
```

### Request Body
```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}
```

### Request Parameters

| Parameter | Type | Required | Description | Validation |
|-----------|------|----------|-------------|-----------|
| `email` | string | Yes | User's email address | Must be a valid email format |
| `fullName.firstName` | string | Yes | User's first name | Minimum 3 characters |
| `fullName.lastName` | string | Yes | User's last name | Minimum 3 characters |
| `password` | string | Yes | User's password | Minimum 6 characters |

---

## Response

### Success Response (201 Created)
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "user@example.com",
    "password": "$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "socketId": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response (400 Bad Request)
```json
{
  "errors": [
    {
      "type": "field",
      "value": "invalid-email",
      "msg": "Please enter a valid email address",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "value": "ab",
      "msg": "First name must be at least 3 characters long",
      "path": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

---

## Validation Rules

The following validation rules are enforced on the request:

1. **Email**: Must be a valid email format
2. **First Name**: Must be at least 3 characters long
3. **Last Name**: Must be at least 3 characters long
4. **Password**: Must be at least 6 characters long

If any validation fails, the server returns a 400 status code with detailed error messages.

---

## Example Usage

### Using cURL
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "password": "password123"
  }'
```

### Using Postman
1. Set request type to **POST**
2. Enter URL: `http://localhost:3000/api/users/register`
3. Go to **Body** tab
4. Select **raw** and choose **JSON**
5. Paste the request body:
```json
{
  "email": "john@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "password123"
}
```
6. Click **Send**

### Using JavaScript/Fetch API
```javascript
fetch('http://localhost:3000/api/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    fullName: {
      firstName: 'John',
      lastName: 'Doe'
    },
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## Status Codes

| Status Code | Meaning | Description |
|------------|---------|-------------|
| 201 | Created | User registration successful |
| 400 | Bad Request | Validation error or missing fields |
| 500 | Server Error | Internal server error |

---

## Technology Stack

- **Framework**: Express.js
- **Database**: MongoDB
- **Validation**: express-validator
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

---

## Environment Variables Required

Ensure these variables are set in your `.env` file:
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

