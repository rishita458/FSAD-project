# Service Connect Backend

Node.js/Express backend API for the Service Connect platform - a service booking and professional management system.

## Project Structure

```
backend/
├── config/          # Configuration files (database, env)
├── controllers/     # Business logic for routes
├── middleware/      # Custom middleware (auth, validation, etc.)
├── models/          # Sequelize ORM models
├── routes/          # API route definitions
├── server.js        # Main server file
├── .env.example     # Environment variables template
├── package.json     # Dependencies and scripts
└── .gitignore       # Git ignore rules
```

## Setup Instructions

### 1. Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Create MySQL Database

```sql
CREATE DATABASE service_connect;
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory by copying `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your MySQL configuration:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=service_connect
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### 5. Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will run on `http://localhost:5000`

## Available API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### User Management
- `GET /api/users/profile` - Get user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile (requires authentication)

### Health Check
- `GET /api/health` - Server health check

## Request/Response Examples

### Register User
**Request:**
```json
POST /api/users/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### Login User
**Request:**
```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
**Request:**
```
GET /api/users/profile
Authorization: Bearer jwt_token_here
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Technologies Used

- **Express.js** - Web framework
- **MySQL** - Relational database
- **Sequelize** - ORM for MySQL
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Development auto-reload

## Database Schema

### Users Table
The `users` table contains the following columns:
- `id` - (INT, PRIMARY KEY, AUTO INCREMENT) User ID
- `firstName` - (VARCHAR(100)) User's first name
- `lastName` - (VARCHAR(100)) User's last name
- `email` - (VARCHAR(255), UNIQUE) User's email
- `password` - (VARCHAR(255)) Hashed password
- `phone` - (VARCHAR(20)) Contact phone number
- `role` - (ENUM: 'user', 'professional', 'admin') User role
- `profession` - (VARCHAR(255)) Professional field
- `bio` - (TEXT) User biography
- `profilePicture` - (VARCHAR(500)) Profile image URL
- `isVerified` - (BOOLEAN) Email verification status
- `createdAt` - (TIMESTAMP) Creation timestamp
- `updatedAt` - (TIMESTAMP) Last update timestamp

## Database Initialization

When the server starts, Sequelize will automatically:
1. Connect to the MySQL database
2. Create the `users` table if it doesn't exist
3. Sync the schema with your models

## Future Enhancements

- Add booking management endpoints
- Add professional profile endpoints
- Add admin dashboard endpoints
- Add payment integration
- Add email notifications
- Add service category management
- Add review and rating system

## Troubleshooting

### Database Connection Error
- Ensure MySQL server is running
- Verify credentials in `.env` file
- Check that the database `service_connect` exists

### Port Already in Use
- Change the `PORT` in `.env`
- Or kill the process using the current port

## Contributing

Please ensure code follows best practices and includes proper error handling.

## License

ISC
