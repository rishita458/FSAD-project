# React Router v7 Migration Guide

## Overview
React Router v7 includes some breaking changes from v6. Here's how to update your code.

## Key Changes

### 1. **Router Configuration**

**Before (v6):**
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
```

**After (v7) - Optional Enhancement:**
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
// Code is still compatible - no changes required for basic routing
```

### 2. **useNavigate Hook (No Changes Required)**

```javascript
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/profile')}>
      Go to Profile
    </button>
  );
}
```

### 3. **Protected Routes Pattern**

Create a `ProtectedRoute` component:

```javascript
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/" replace />;
}

// Usage in App.js
<Route
  path="/dashboard"
  element={<ProtectedRoute element={<UserDashboard />} isAuthenticated={!!authToken} />}
/>
```

### 4. **Route Parameters**

```javascript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <div>User ID: {userId}</div>;
}

// In App.js
<Route path="/profile/:userId" element={<UserProfile />} />
```

### 5. **Lazy Loading Routes (Recommended)**

```javascript
import { Suspense, lazy } from 'react';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
```

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Ensure all route component imports are correct.

### Issue: Layout routes not working
**Solution:** Use nested routes:
```javascript
<Route path="/" element={<Layout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

### Issue: Navigation not updating
**Solution:** Clear browser cache and restart dev server.

## Testing Checklist

- [ ] All routes load correctly
- [ ] Navigation between pages works
- [ ] Protected routes redirect when not authenticated
- [ ] Route parameters work (e.g., `/profile/:id`)
- [ ] Back button navigates correctly
- [ ] Refresh preserves route state
- [ ] Mobile navigation works

## Resources

- [React Router v7 Docs](https://reactrouter.com/)
- [Migration Guide](https://reactrouter.com/upgrading)
- [API Reference](https://reactrouter.com/en/main/start/overview)
