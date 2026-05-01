# 🚀 Service Connect - Complete Setup Guide

## Project Overview

Service Connect is a full-stack platform for booking professional services. It features:
- User registration and authentication
- Professional profiles and bookings
- Admin dashboard
- Review system
- Role-based access control

## 📋 Tech Stack

### Frontend
- React 19 with React Router 7
- Context API for state management
- CSS3 with responsive design
- Modern JavaScript (ES6+)

### Backend
- Express.js
- Sequelize ORM
- MySQL Database
- JWT Authentication
- bcryptjs for password hashing

## 🔧 Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Root directory
npm run install-all

# Or manually:
npm install
cd backend && npm install && cd ..
```

### 2. Configure Environment Variables

#### Backend `.env` file
Create `backend/.env` with:

```
# Server
PORT=5000
NODE_ENV=development

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=service_connect
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secret_key_min_32_chars_long_!
JWT_EXPIRE=7d

# Client
CLIENT_URL=http://localhost:3000
```

#### Frontend `.env` file (optional)
Create `.env` in root (if needed):

```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Setup MySQL Database

```bash
# Create database
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE service_connect;
USE service_connect;
```

### 4. Start the Project

#### Development Mode (Both frontend & backend)
```bash
npm run dev
```

This runs:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

#### Or run separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

### 5. Seed Initial Data

```bash
cd backend
npm run seed:categories
```

## ✨ Features Implemented

### Authentication ✅
- [x] User Registration with validation
- [x] User Login with JWT tokens
- [x] Role-based access (user, professional, admin)
- [x] Protected routes
- [x] Auto-logout on token expiry
- [x] Password hashing with bcryptjs

### Frontend Pages ✅
- [x] Home page with service listings
- [x] Login page with email/password validation
- [x] Register page with role selection
- [x] User Dashboard with:
  - Active bookings overview
  - Available professionals list
  - Quick action buttons
  - Recent bookings

### UI/UX ✅
- [x] Modern gradient design
- [x] Responsive navbar with user dropdown
- [x] Loading states
- [x] Error handling & messages
- [x] Mobile-friendly layout

### API Integration ✅
- [x] Centralized API client (`apiClient.js`)
- [x] JWT token management
- [x] Automatic token injection in headers
- [x] Error handling middleware

## 🔌 API Endpoints (Ready)

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

### Professionals
- `GET /api/professionals` - List all professionals
- `GET /api/professionals/:id` - Get professional details
- `POST /api/professionals` - Create professional profile
- `PUT /api/professionals/:id` - Update profile

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Categories
- `GET /api/categories` - List service categories
- `POST /api/categories` - Create category (admin)

### Reviews
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review

## 📁 Project Structure

```
service-connect/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── bookingController.js
│   │   ├── professionalController.js
│   │   └── ...
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── ProfessionalProfile.js
│   │   └── ...
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── ...
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── validation.js
│   │   └── ...
│   ├── .env (create this)
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── context/
│   │   └── AuthContext.js ✨ NEW
│   ├── components/
│   │   └── Navbar.js ✅ UPDATED
│   ├── pages/
│   │   ├── Login.js ✅ UPDATED
│   │   ├── Register.js ✅ UPDATED
│   │   ├── Home.js
│   │   ├── UserDashboard.js ✅ UPDATED
│   │   ├── ProfessionalDashboard.js (todo)
│   │   ├── AdminDashboard.js (todo)
│   │   └── ...
│   ├── styles/
│   │   ├── auth.css ✅ UPDATED
│   │   ├── navbar.css ✨ NEW
│   │   ├── dashboard.css ✅ UPDATED
│   │   └── ...
│   ├── utils/
│   │   ├── apiClient.js
│   │   ├── routes.js
│   │   └── ...
│   ├── App.js ✅ UPDATED
│   └── index.js
│
├── package.json
├── README.md
└── ...
```

## 🧪 Testing the App

### Test Login/Register Flow
1. Open http://localhost:3000
2. Click "Register"
3. Fill in details:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Test123456
   - Role: User
4. Click Register
5. You'll be redirected to User Dashboard
6. Click the user dropdown menu in navbar to logout

### Test API Endpoints
```bash
# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test123456"}'

# Get JWT token from response
# Use in subsequent requests:
curl -X GET http://localhost:5000/api/professionals \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Check DB credentials in `.env`
- Verify database exists: `USE service_connect;`

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# Or kill process on port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### CORS Errors
- Check `CLIENT_URL` in backend `.env`
- Ensure it matches your frontend URL

### Token Not Saving
- Check browser localStorage is enabled
- Clear cache and try again
- Check browser console for errors

## 📝 Next Steps

### Features to Add
1. [ ] Booking system implementation
2. [ ] Professional onboarding flow
3. [ ] Review & rating system
4. [ ] Search & filter functionality
5. [ ] Payment integration
6. [ ] Email notifications
7. [ ] Admin dashboard features
8. [ ] User profile management

### Performance Improvements
1. [ ] Image optimization
2. [ ] Code splitting
3. [ ] Caching strategies
4. [ ] Database indexing
5. [ ] API pagination

### Security Enhancements
1. [ ] Rate limiting
2. [ ] Input sanitization
3. [ ] CSRF protection
4. [ ] Secure cookies
5. [ ] Environment variables validation

## 🤝 Contributing

1. Create a new branch for features
2. Follow existing code patterns
3. Test before submitting
4. Update documentation

## 📚 Documentation

- Backend Routes: See `SERVICES_REFERENCE.md`
- URL Structure: See `URL_STRUCTURE_GUIDE.md`
- Migration Guide: See `MIGRATION_CHECKLIST.md`

## ✅ Checklist Before Production

- [ ] Database backups configured
- [ ] Environment variables set securely
- [ ] API rate limiting enabled
- [ ] HTTPS configured
- [ ] Error logging setup
- [ ] Monitor uptime
- [ ] Backup & recovery plan

## 💡 Tips

- Use `npm run seed:refresh` to reset and reseed database
- Check `backend/server.js` for health check: `/api/health`
- View API info: `/api/info`
- Use Redux DevTools for debugging (if Redux added)

---

**Status**: Ready for development and testing ✨

**Last Updated**: April 28, 2026
