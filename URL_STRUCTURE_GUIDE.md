# URL Structure Guide - Service Connect

This document outlines the improved URL structure for both the frontend (React) and backend (Node.js/Express) applications.

---

## 🎯 Frontend URL Structure (React Router v7)

### Overview
The frontend uses a hierarchical URL structure with clear separation between:
- **Public Routes** (accessible without authentication)
- **User Dashboard** (for end-user customers)
- **Professional Dashboard** (for service professionals)
- **Admin Dashboard** (for administrators)
- **Support Dashboard** (for support staff)

### URL Hierarchy

```
/                                    # Home/Landing Page
├── /auth/
│   ├── /login                      # Login page
│   └── /register                   # Registration page
│
├── /dashboard/user/                # User Dashboard
│   ├── (main)                      # User home/overview
│   ├── /profile                    # View/edit own profile
│   ├── /profile/:userId            # View specific user profile
│   ├── /bookings                   # View all bookings
│   ├── /bookings/:bookingId        # View specific booking details
│   ├── /professionals              # Browse professionals/services
│   └── /professionals/:professionalId  # View professional profile
│
├── /dashboard/professional/        # Professional Dashboard
│   ├── (main)                      # Professional home/overview
│   ├── /profile                    # View/edit own profile
│   ├── /profile/:professionalId    # View specific professional profile
│   ├── /bookings                   # View assigned bookings
│   └── /bookings/:bookingId        # View specific booking details
│
├── /dashboard/admin/               # Admin Dashboard
│   ├── (main)                      # Admin home/overview
│   ├── /users                      # User management
│   ├── /users/:userId              # User details/management
│   ├── /professionals              # Professional management
│   ├── /professionals/:professionalId # Professional details
│   ├── /bookings                   # Booking oversight
│   ├── /bookings/:bookingId        # Booking details
│   ├── /categories                 # Category management
│   └── /categories/:categoryId      # Category details
│
├── /dashboard/support/             # Support Dashboard
│   └── (main)                      # Support tickets/issues
│
└── /unauthorized                   # Unauthorized access page
```

### Backward Compatibility
Legacy URLs are automatically redirected to new URLs:
- `/login` → `/auth/login`
- `/register` → `/auth/register`
- `/user` → `/dashboard/user`
- `/profile` → `/dashboard/user/profile`
- `/history` → `/dashboard/user/bookings`
- `/profession` → `/dashboard/user/professionals`

### Route Parameters

| Parameter | Usage | Example |
|-----------|-------|---------|
| `:userId` | Unique user identifier | `/dashboard/user/profile/123` |
| `:professionalId` | Professional profile ID | `/dashboard/user/professionals/456` |
| `:bookingId` | Booking reference ID | `/dashboard/user/bookings/789` |
| `:categoryId` | Service category ID | `/dashboard/admin/categories/12` |

### Authentication
Routes are protected with a `ProtectedRoute` component that:
- Checks for authentication token in `localStorage`
- Verifies user role matches the required role
- Redirects to `/login` if not authenticated
- Redirects to `/unauthorized` if role doesn't match

---

## 🔌 Backend API Structure (Express.js)

### Base URL
```
http://localhost:5000/api
```

### API Endpoints

#### Health & Information
```
GET  /api/health                    # Server health check
GET  /api/info                      # API documentation & endpoints
```

#### User Management
```
GET    /api/users                   # List all users
GET    /api/users/:id               # Get specific user
POST   /api/users                   # Create new user
PUT    /api/users/:id               # Update user
DELETE /api/users/:id               # Delete user
```

#### Professional Management
```
GET    /api/professionals           # List all professionals
GET    /api/professionals/:id       # Get specific professional
POST   /api/professionals           # Create new professional profile
PUT    /api/professionals/:id       # Update professional
DELETE /api/professionals/:id       # Delete professional
```

#### Booking Management
```
GET    /api/bookings                # List all bookings
GET    /api/bookings/:id            # Get specific booking
POST   /api/bookings                # Create new booking
PUT    /api/bookings/:id            # Update booking status/details
DELETE /api/bookings/:id            # Cancel booking
```

#### Category Management
```
GET    /api/categories              # List all categories
GET    /api/categories/:id          # Get specific category
POST   /api/categories              # Create new category
PUT    /api/categories/:id          # Update category
DELETE /api/categories/:id          # Delete category
```

#### Review Management
```
GET    /api/reviews                 # List all reviews
GET    /api/reviews/:id             # Get specific review
POST   /api/reviews                 # Create new review
PUT    /api/reviews/:id             # Update review
DELETE /api/reviews/:id             # Delete review
```

#### Admin Management
```
GET    /api/admin                   # List admin functions
GET    /api/admin/:id               # Get admin resource
POST   /api/admin                   # Create admin resource
PUT    /api/admin/:id               # Update admin resource
DELETE /api/admin/:id               # Delete admin resource
```

---

## 📋 API Request/Response Standards

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>  (for protected routes)
```

### Success Response Format
```json
{
  "success": true,
  "data": { /* resource data */ },
  "message": "Operation successful"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "timestamp": "2026-04-27T10:30:00.000Z"
  }
}
```

### HTTP Status Codes
- `200 OK` - Successful GET, PUT requests
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid input/validation error
- `401 Unauthorized` - Missing/invalid authentication
- `403 Forbidden` - Valid auth but insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🔒 Authentication & Authorization

### Authentication Flow
1. **Register**: `POST /api/users` with email/password
2. **Login**: User credentials checked, JWT token returned
3. **Token Storage**: Token stored in `localStorage`
4. **Token Usage**: Token sent in `Authorization: Bearer <token>` header
5. **Token Validation**: Verified on protected routes

### User Roles
- `user` - Regular service customer
- `professional` - Service provider
- `admin` - System administrator
- `support` - Support staff

### Protected Routes by Role
| Role | Accessible Routes |
|------|-------------------|
| `user` | `/dashboard/user/*` |
| `professional` | `/dashboard/professional/*` |
| `admin` | `/dashboard/admin/*` |
| `support` | `/dashboard/support/*` |

---

## 🎯 Best Practices for URL Usage

### Frontend
1. ✅ Use `useNavigate()` hook for programmatic navigation
2. ✅ Use `Link` component for navigation links
3. ✅ Use `useParams()` to extract route parameters
4. ✅ Always check authentication before accessing protected routes
5. ❌ Don't hardcode URLs - use React Router's navigation methods

### Backend
1. ✅ Use RESTful conventions (GET, POST, PUT, DELETE)
2. ✅ Include resource IDs in URL path for specific resources
3. ✅ Use query parameters for filtering/pagination (e.g., `/api/users?role=professional&page=1`)
4. ✅ Return consistent JSON response format
5. ✅ Include proper HTTP status codes
6. ❌ Don't use GET for state-changing operations
7. ❌ Don't expose sensitive information in URLs

---

## 📊 API Versioning Strategy (Future)

When major changes occur, consider URL versioning:
```
/api/v1/users       # Version 1
/api/v2/users       # Version 2 (future)
```

Current API is considered **v1.0.0** and accessible at `/api/*`

---

## 🔧 Common Use Cases

### Get User's Bookings
```
GET /api/bookings?userId=123
```

### Get Professional's Services
```
GET /api/professionals/456/services
```

### Search Professionals by Category
```
GET /api/professionals?categoryId=789&city=NewYork
```

### Create Booking
```
POST /api/bookings
Content-Type: application/json

{
  "userId": 123,
  "professionalId": 456,
  "serviceDate": "2026-05-01",
  "categoryId": 789
}
```

---

## 📞 API Documentation

For real-time API endpoint documentation, visit:
```
http://localhost:5000/api/info
```

This returns a complete list of all available endpoints with their methods.

---

## 🚀 Migration Notes

### For Frontend Developers
- Update any hardcoded URL references to use new route structure
- Use `useNavigate()` instead of direct navigation
- Test backward compatibility redirects
- Update bookmarks and documentation

### For Backend Developers
- Ensure all controllers handle the restructured routes correctly
- Verify API endpoints return proper status codes
- Test error handling for all operations
- Update API documentation comments in code

---

Last Updated: April 27, 2026
