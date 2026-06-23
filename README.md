# 🚀 SiteBuilder - Visual Development Platform

SiteBuilder is a full-stack visual website creation platform that enables users to design responsive websites using drag-and-drop components and generate production-ready code.

The platform provides a developer-focused building experience with a visual editor, component management, project storage, live previews, responsive customization, and HTML/CSS export functionality.

Unlike traditional website builders, SiteBuilder internally manages websites as structured component trees, allowing designs to be converted into clean reusable code.

---

# ✨ Features


## 🎨 Visual Website Builder

- Drag and drop editor
- Real-time canvas rendering
- Component-based architecture
- Element selection
- Component nesting
- Resize and positioning
- Duplicate components
- Delete components
- Component hierarchy management


---

## 🧩 Component System

Available components:

### Layout

- Section
- Container
- Grid
- Columns


### Text

- Heading
- Paragraph
- Links


### Media

- Images
- Videos
- Icons


### Forms

- Input
- Button
- Checkbox
- Textarea


### UI Components

- Cards
- Navbar
- Footer
- Hero Sections


---

# 🎛️ Style Customization

Modify every component property:

- Width
- Height
- Padding
- Margin
- Colors
- Background
- Typography
- Border radius
- Shadows
- Positioning


---

# 🌳 Component Tree Engine

Each website is stored as structured JSON.


Example:


{
 id:"123",

 type:"button",

 props:{
  text:"Get Started",

  styles:{
   color:"blue"
  }
 },

 children:[]
}


This allows:

- Dynamic rendering
- Easy editing
- Code generation


---

# 💻 Code Generation Engine

Convert visual designs into:


HTML

CSS


Features:

- Generate clean markup
- Copy code
- Download files
- Export projects


---

# 📱 Responsive Builder


Preview modes:

- Desktop
- Tablet
- Mobile


---

# 👤 User Features

- Register/Login
- Create projects
- Save websites
- Edit projects
- Duplicate projects
- Delete projects


---

# 🏗️ Architecture


User

↓

React Client

↓

Express API

↓

MongoDB


Builder Engine:

Component Tree

↓

Renderer

↓

Code Generator


---

# 🛠️ Tech Stack


Frontend:

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- DND Kit
- React Router
- Axios


Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js


---

# Database Models


User

Project

Template

Asset


---

# API Routes


Authentication:

POST /api/auth/register

POST /api/auth/login


Projects:

GET /api/projects

POST /api/projects

PUT /api/projects/:id

DELETE /api/projects/:id


Assets:

POST /api/assets/upload


---

# Installation


Clone repository:


```bash
git clone https://github.com/username/sitebuilder.git
cd sitebuilder
```


Frontend:

```bash
cd frontend
npm install
npm run dev
```


Backend:

```bash
cd backend
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

# Advanced Concepts Implemented

- Component-driven architecture
- Tree data structures
- Recursive rendering
- Drag-and-drop systems
- State management
- Authentication
- REST APIs
- Code generation


---

# Future Improvements

- AI component generation
- React component export
- Template marketplace
- Collaboration mode
- Version history


---

# Author

SiteBuilder demonstrates advanced frontend engineering, complex state management, full-stack architecture, and real-world SaaS development concepts.