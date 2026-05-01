# MySQL Setup Guide for Service Connect Backend

This guide will help you set up MySQL for the Service Connect backend.

## Prerequisites

- MySQL Server installed (Download from: https://dev.mysql.com/downloads/mysql/)
- MySQL running on your system

## Setup Steps

### 1. Create the Database

You can create the database using either the MySQL Command Line or a GUI tool.

#### Using MySQL Command Line:

```bash
# Log in to MySQL
mysql -u root -p

# Create the database
CREATE DATABASE service_connect;

# Verify the database was created
SHOW DATABASES;

# Exit MySQL
exit;
```

#### Using MySQL Workbench (GUI):
1. Open MySQL Workbench
2. Click on the MySQL Server connection
3. Go to File → New Query Tab
4. Paste the SQL command: `CREATE DATABASE service_connect;`
5. Click the Execute button (Lightning icon)

### 2. Update Your `.env` File

Create or update the `backend/.env` file with your MySQL credentials:

```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:3000

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=service_connect

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this
JWT_EXPIRE=7d

# Node Environment
NODE_ENV=development
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Start the Backend Server

The first time you start the server, it will automatically create the `users` table.

```bash
npm run dev
```

You should see:
```
MySQL connected successfully
Database models synced
Server running on port 5000
```

## Verify the Setup

### Using MySQL Command Line:

```bash
mysql -u root -p

# Use the database
USE service_connect;

# View tables
SHOW TABLES;

# View users table structure
DESCRIBE users;

# View all users (should be empty initially)
SELECT * FROM users;

exit;
```

### Using MySQL Workbench:
1. Click on your MySQL Server connection
2. In the left panel, expand "Databases"
3. You should see `service_connect` database
4. Expand it to see the `users` table

## Common Issues and Solutions

### Issue: "Access denied for user 'root'"
**Solution:** Check your MySQL username and password in the `.env` file. Update `DB_USER` and `DB_PASSWORD` with correct credentials.

### Issue: "Unknown database 'service_connect'"
**Solution:** The database might not exist. Run the SQL command above to create it, or restart the backend server to auto-create the database.

### Issue: "Cannot create unique constraint"
**Solution:** Drop and recreate the database:
```bash
mysql -u root -p

DROP DATABASE service_connect;
CREATE DATABASE service_connect;

exit;
```

### Issue: Port 3306 already in use
**Solution:** Change the `DB_PORT` in your `.env` file to an available port, or stop the other MySQL instance.

## Database Table Details

The `users` table will have the following structure:

| Column | Type | Constraints |
|--------|------|-------------|
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| firstName | VARCHAR(100) | NOT NULL |
| lastName | VARCHAR(100) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL |
| phone | VARCHAR(20) | |
| role | ENUM('user','professional','admin') | DEFAULT 'user' |
| profilePicture | VARCHAR(500) | |
| bio | TEXT | |
| profession | VARCHAR(255) | |
| isVerified | BOOLEAN | DEFAULT FALSE |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

## Testing the API

After the server starts, test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

Response should be:
```json
{"status":"Server is running"}
```

## Backup and Restore

### Backup Database:
```bash
mysqldump -u root -p service_connect > service_connect_backup.sql
```

### Restore Database:
```bash
mysql -u root -p service_connect < service_connect_backup.sql
```

## Additional Resources

- [MySQL Official Documentation](https://dev.mysql.com/doc/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Workbench Download](https://dev.mysql.com/downloads/workbench/)
