# Service Categories - Complete Reference

## 📋 Overview

Service Connect now includes **36 professional service categories** organized into 9 main groups. These services can be viewed on the home page and are available through the API.

---

## 🏠 Service Categories by Group

### 1. **Home & Maintenance** (6 services)
These services help maintain and improve your home or office.

| Service | Description |
|---------|-------------|
| **Plumber** | Professional plumbing services including repairs, installations, and maintenance |
| **Electrician** | Electrical repairs, installations, and troubleshooting services |
| **Carpenter** | Carpentry work including furniture, repairs, and custom building |
| **Painter** | Professional painting services for walls, furniture, and decorative work |
| **Handyman** | General maintenance and repair services for homes and offices |
| **Gardener** | Landscaping, gardening, and yard maintenance services |

### 2. **Personal Care & Beauty** (4 services)
Personal grooming and wellness services.

| Service | Description |
|---------|-------------|
| **Hair Stylist** | Professional hair styling, cutting, and coloring services |
| **Barber** | Professional men's grooming and barbering services |
| **Makeup Artist** | Professional makeup application for events and special occasions |
| **Massage Therapist** | Therapeutic massage services for relaxation and wellness |

### 3. **Cleaning Services** (3 services)
Professional cleaning and sanitation services.

| Service | Description |
|---------|-------------|
| **Cleaner** | General cleaning and housekeeping services |
| **House Cleaner** | Professional deep cleaning and regular house maintenance |
| **Carpet Cleaner** | Specialized carpet and upholstery cleaning services |

### 4. **Food & Hospitality** (3 services)
Culinary and hospitality services.

| Service | Description |
|---------|-------------|
| **Chef/Cook** | Professional cooking and meal preparation services |
| **Server** | Professional event and restaurant serving services |
| **Caterer** | Full catering services for events and celebrations |

### 5. **Education & Training** (4 services)
Learning and skill development services.

| Service | Description |
|---------|-------------|
| **Personal Tutor** | Academic tutoring and personalized education services |
| **Music Instructor** | Professional music lessons and instruction |
| **Fitness Trainer** | Personal training and fitness coaching services |
| **Yoga Instructor** | Professional yoga classes and wellness instruction |

### 6. **Pet Services** (3 services)
Professional pet care services.

| Service | Description |
|---------|-------------|
| **Pet Groomer** | Professional pet grooming and bathing services |
| **Dog Walker** | Professional dog walking and pet exercise services |
| **Pet Sitter** | Pet sitting and care services while you're away |

### 7. **Automotive** (3 services)
Vehicle maintenance and care services.

| Service | Description |
|---------|-------------|
| **Mechanic** | Vehicle repair and maintenance services |
| **Car Washer** | Professional car washing and detailing services |
| **Auto Electrician** | Automotive electrical system repairs and diagnostics |

### 8. **Technology & Digital** (3 services)
Tech-related professional services.

| Service | Description |
|---------|-------------|
| **IT Support** | Computer and IT support services |
| **Web Designer** | Professional web design and development services |
| **Photographer** | Professional photography services for events and portraits |

### 9. **Professional Services** (3 services)
Business and consulting services.

| Service | Description |
|---------|-------------|
| **Personal Assistant** | Administrative and personal assistance services |
| **Event Planner** | Professional event planning and coordination services |
| **Consultant** | Professional consulting and advisory services |

### 10. **Health & Wellness** (2 services)
Health and lifestyle improvement services.

| Service | Description |
|---------|-------------|
| **Nutritionist** | Professional nutrition counseling and meal planning |
| **Life Coach** | Personal coaching and life guidance services |

---

## 🗄️ Database Setup

### Initial Setup: Seed the Database

To populate the database with all 36 service categories, run:

```bash
# Navigate to backend directory
cd backend

# Seed the database
npm run seed:categories
```

**Output:**
```
🌱 Starting database seeding...
✅ Database synced
📝 Creating 36 service categories...
  ✓ Plumber
  ✓ Electrician
  ✓ Carpenter
  ... (33 more)
✅ Seeding complete! 36 categories created.
```

### Reset the Database

To clear all service categories and start fresh:

```bash
npm run seed:reset
```

### Refresh: Reset & Reseed

To reset and then reseed in one command:

```bash
npm run seed:refresh
```

---

## 🔌 API Endpoints

### Get All Categories

```
GET /api/categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Plumber",
    "description": "Professional plumbing services...",
    "icon": "FaTools",
    "isActive": true,
    "createdAt": "2026-04-27T10:00:00.000Z",
    "updatedAt": "2026-04-27T10:00:00.000Z"
  },
  ...
]
```

### Get Specific Category

```
GET /api/categories/:id
```

**Example:**
```
GET /api/categories/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Plumber",
  "description": "Professional plumbing services...",
  "icon": "FaTools",
  "isActive": true
}
```

### Create New Category

```
POST /api/categories
Content-Type: application/json

{
  "name": "New Service",
  "description": "Service description",
  "icon": "FaIcon"
}
```

### Update Category

```
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Updated Service Name",
  "description": "Updated description",
  "icon": "FaNewIcon",
  "isActive": true
}
```

### Delete Category

```
DELETE /api/categories/:id
```

---

## 🎨 Frontend Display

### Home Page Service Cards

The home page displays all services as interactive cards with:
- **Icon**: Visual representation of the service
- **Color**: Unique color for each service
- **Description**: Brief explanation of the service
- **Hover Effect**: Card lifts up on hover

### Using Filtered Services

To show only specific service categories on a page:

```javascript
import { ROUTES } from '../utils/routes';
import { apiClient } from '../utils/apiClient';

function ServiceList() {
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    // Get all services
    apiClient.get('/categories')
      .then(data => setServices(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {services.map(service => (
        <div key={service.id} onClick={() => {
          // Navigate to professionals in this category
          navigate(`${ROUTES.USER.PROFESSIONALS}?categoryId=${service.id}`);
        }}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 Service Statistics

| Metric | Count |
|--------|-------|
| Total Services | 36 |
| Service Categories | 10 |
| API Endpoints | 5 |
| Seeding Scripts | 2 |

---

## 🔧 Customization

### Adding a New Service

1. **Add to seed data** (`backend/seeds/serviceCategories.js`):
```javascript
{
  name: "Your Service Name",
  description: "Service description",
  icon: "FaIconName"
}
```

2. **Update home page** (`src/pages/Home.js`):
The frontend dynamically loads services, so updating the seed file automatically includes them in the API.

3. **Refresh database**:
```bash
cd backend
npm run seed:refresh
```

4. **Verify in API**:
```
GET http://localhost:5000/api/categories
```

### Removing a Service

Instead of deleting from the database, set `isActive: false`:

```javascript
PUT /api/categories/:id
{
  "isActive": false
}
```

This keeps historical data while hiding it from the frontend.

---

## 🏆 Best Practices

### For Professionals
- Create a profile with your specific service category
- Add qualifications and certifications
- Set your service rates and availability
- Maintain 5-star quality to attract bookings

### For Customers
- Browse services by category on the home page
- Read professional reviews before hiring
- Leave detailed reviews after service completion
- Build long-term relationships with trusted professionals

### For Administrators
- Monitor new service categories regularly
- Ensure all professionals have verified credentials
- Remove inactive or problematic professionals
- Handle disputes and reviews fairly

---

## 📞 Support

For issues with services:

1. **Service not showing?** Run `npm run seed:refresh`
2. **Can't find a professional?** Try filtering by different categories
3. **Need a new service?** Follow the "Adding a New Service" section above

---

## 📝 Seed File Location

```
backend/
├── seeds/
│   └── serviceCategories.js     ← Service data
├── scripts/
│   ├── seedCategories.js        ← Seed script
│   └── resetCategories.js       ← Reset script
└── package.json                  ← Seed commands
```

---

**Last Updated:** April 27, 2026  
**Total Services:** 36  
**Categories:** 10  
**Status:** ✅ Ready to Use
