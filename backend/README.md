# 🚀 SiteBuilder Backend API

Backend service powering SiteBuilder website creation platform.

Handles authentication, project persistence, assets, and website data storage.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js


---

# Features


## Authentication

- User registration
- Login system
- JWT tokens
- Protected routes


---

# Project Management

Users can:

- Create projects
- Save designs
- Update projects
- Delete projects


---

# Component Storage

Websites are stored as JSON component trees.


Example:


Project:

{
name,

components:[],

styles:{}
}


---

# Asset Management

Supports:

- Image uploads
- File management
- Asset linking


---

# API Endpoints


Auth:

/api/auth


Projects:

/api/projects


Assets:

/api/assets


Templates:

/api/templates


---

# Database Models


User Model


Project Model


Asset Model


Template Model


---

# Installation


```bash
npm install
npm run dev
```


---

# Environment Variables


PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=


---

# Engineering Concepts

- REST architecture
- MVC pattern
- Authentication middleware
- Database relationships
- JSON document storage
- API security
