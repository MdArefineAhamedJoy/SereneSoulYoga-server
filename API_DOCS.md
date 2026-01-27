# SereneSoulYoga Server API Documentation

Base URL: `http://localhost:5000`

---

## Health Check

### GET /
Check server health

**Response:**
```json
"Hello Yoga Server"
```

---

## Payment APIs

### POST /create-payment-intent
Create Stripe payment intent

**Request Body:**
```json
{
  "price": 100
}
```

**Response:**
```json
{
  "clientSecret": "pi_xxxxxxxxxxxx_secret_xxxxxxxxxxxx"
}
```

---

## Enrollment APIs

### GET /all/selected/class/:id
Get a selected class by ID

**Parameters:**
- `id` (path) - Class ID

**Response:**
```json
{
  "_id": "...",
  "userEmail": "user@example.com",
  "classId": "...",
  "name": "Yoga Class Name",
  "image": "https://...",
  "availableSite": 20,
  "enroll": 5,
  "price": 100,
  "status": "approved",
  "categoryName": "Hatha Yoga",
  "instructorName": "John Doe",
  "description": "Class description",
  "email": "instructor@example.com"
}
```

---

### POST /enrollClasses
Enroll in a class

**Query Parameters:**
- `id` - Selected class ID to remove from selected

**Request Body:**
```json
{
  "paymentUser": "user@example.com",
  "classId": "class123",
  "transactionId": "txn_xxxxxxxxxxxx",
  "price": 100,
  "name": "Yoga Class Name",
  "image": "https://...",
  "availableSite": 20,
  "enroll": 5,
  "status": "approved",
  "categoryName": "Hatha Yoga",
  "instructorName": "John Doe",
  "description": "Class description",
  "email": "instructor@example.com"
}
```

---

### GET /enrollClasses/:email
Get all enrolled classes for a user

**Parameters:**
- `email` (path) - User email

**Response:**
```json
[
  {
    "_id": "...",
    "paymentUser": "user@example.com",
    "classId": "...",
    "transactionId": "txn_xxxxxxxxxxxx",
    "price": 100,
    "date": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## Class APIs

### PUT /updateClass/:id
Update class available seats and enrollment count

**Parameters:**
- `id` (path) - Class ID

**Response:**
```json
{
  "_id": "...",
  "availableSite": 19,
  "enroll": 6
}
```

---

### GET /allClasses
Get all classes

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Yoga Class Name",
    "email": "instructor@example.com",
    "image": "https://...",
    "availableSite": 20,
    "enroll": 5,
    "price": 100,
    "status": "approved",
    "categoryName": "Hatha Yoga",
    "instructorName": "John Doe",
    "description": "Class description",
    "feedback": []
  }
]
```

---

### GET /approveClass
Get classes by approval status

**Query Parameters:**
- `status` - Status filter (pending/approved/denied)

**Example:**
```
GET /approveClass?status=approved
```

**Response:**
```json
[
  {
    "_id": "...",
    "status": "approved",
    ...
  }
]
```

---

### POST /allClasses/select
Select a class (add to selected classes)

**Request Body:**
```json
{
  "userEmail": "user@example.com",
  "classId": "...",
  "name": "Yoga Class Name",
  "image": "https://...",
  "availableSite": 20,
  "enroll": 5,
  "price": 100,
  "status": "pending",
  "categoryName": "Hatha Yoga",
  "instructorName": "John Doe",
  "description": "Class description",
  "email": "instructor@example.com"
}
```

---

### GET /allClasses/selected/:email
Get all selected classes for a user

**Parameters:**
- `email` (path) - User email

**Response:**
```json
[
  {
    "_id": "...",
    "userEmail": "user@example.com",
    "classId": "...",
    "name": "Yoga Class Name"
  }
]
```

---

### DELETE /classDelete/:id
Delete a selected class

**Parameters:**
- `id` (path) - Selected class ID

**Response:**
```json
{
  "_id": "...",
  "deletedCount": 1
}
```

---

### PATCH /allClasses/status/:id
Update class status

**Parameters:**
- `id` (path) - Class ID

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response:**
```json
{
  "_id": "...",
  "status": "approved"
}
```

---

### GET /popularClass
Get top 6 popular classes (sorted by enrollment)

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Popular Yoga Class",
    "enroll": 50,
    ...
  }
]
```

---

### PUT /admin/feedBack/:id
Add feedback to a class

**Parameters:**
- `id` (path) - Class ID

**Request Body:**
```json
{
  "feedback": ["Great class!", "Very helpful"]
}
```

**Response:**
```json
{
  "_id": "...",
  "feedback": ["Great class!", "Very helpful"]
}
```

---

## Instructor APIs

### POST /instructor
Create a new instructor class

**Request Body:**
```json
{
  "name": "Yoga Class Name",
  "email": "instructor@example.com",
  "image": "https://...",
  "availableSite": 20,
  "enroll": 0,
  "price": 100,
  "status": "pending",
  "categoryName": "Hatha Yoga",
  "instructorName": "John Doe",
  "description": "Class description",
  "feedback": []
}
```

---

### GET /instructor/:emails
Get all classes by instructor email

**Parameters:**
- `emails` (path) - Instructor email

**Response:**
```json
[
  {
    "_id": "...",
    "email": "instructor@example.com",
    "name": "Yoga Class Name"
  }
]
```

---

### GET /popular/instructor
Get top 6 popular instructors

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "instructor@example.com",
    "photoURL": "https://...",
    "role": "instructor"
  }
]
```

---

## User APIs

### POST /users
Create a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "photoURL": "https://...",
  "role": "student"
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "student"
}
```

**Error Response (if user exists):**
```json
{
  "message": "User Already Exist"
}
```

---

### GET /users
Get all users

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "user@example.com",
    "photoURL": "https://...",
    "role": "student"
  }
]
```

---

### PATCH /users/roll/:id
Update user role

**Parameters:**
- `id` (path) - User ID

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response:**
```json
{
  "_id": "...",
  "role": "admin"
}
```

---

## Content APIs

### GET /banner
Get all banners

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Welcome to Yoga",
    "description": "Start your journey",
    "image": "https://...",
    "isActive": true
  }
]
```

---

### GET /topYoga
Get all top yoga items

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Morning Yoga",
    "description": "Start your day right",
    "image": "https://...",
    "category": "Beginner"
  }
]
```

---

### GET /memberShip
Get all membership plans

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Basic Plan",
    "price": 50,
    "duration": "1 month",
    "features": ["Access to basic classes", "Email support"]
  }
]
```

---

### GET /health
Get all health content

**Response:**
```json
[
  {
    "_id": "...",
    "title": "Yoga for Health",
    "description": "Improve your health",
    "image": "https://...",
    "category": "Wellness",
    "benefits": ["Stress relief", "Better posture"]
  }
]
```

---

### GET /blog
Get all blog posts

**Response:**
```json
[
  {
    "_id": "...",
    "title": "10 Yoga Tips",
    "content": "Full blog content...",
    "image": "https://...",
    "author": "Jane Smith",
    "category": "Tips",
    "tags": ["yoga", "health", "wellness"]
  }
]
```

---

### GET /feedback
Get all feedback

**Response:**
```json
[
  {
    "_id": "...",
    "userName": "John Doe",
    "userEmail": "user@example.com",
    "rating": 5,
    "comment": "Amazing class!"
  }
]
```

---

## Testing with cURL

### Health Check
```bash
curl http://localhost:5000/
```

### Get All Classes
```bash
curl http://localhost:5000/allClasses
```

### Create Payment Intent
```bash
curl -X POST http://localhost:5000/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"price": 100}'
```

### Create User
```bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"student"}'
```

### Select a Class
```bash
curl -X POST http://localhost:5000/allClasses/select \
  -H "Content-Type: application/json" \
  -d '{"userEmail":"john@example.com","classId":"123","name":"Yoga Class","email":"instructor@example.com","image":"https://example.com/img.jpg","availableSite":20,"enroll":0,"price":100,"status":"pending","categoryName":"Hatha","instructorName":"Jane","description":"Test"}'
```

### Get Popular Classes
```bash
curl http://localhost:5000/popularClass
```

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Summary

**Total Endpoints: 28**

| Category | Count |
|----------|-------|
| Health Check | 1 |
| Payment | 1 |
| Enrollment | 3 |
| Classes | 9 |
| Instructors | 3 |
| Users | 3 |
| Content | 6 |
| Error Handler | 1 (global middleware) |
| **Total** | **27 + 1 health** |
