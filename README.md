# 🚀 StaffMerge – Job Listing & Recruitment Platform

**StaffMerge** is a modern job listing and recruitment platform that allows users to **search, apply & get their dream jobs**. Companies can post vacancies, and job seekers can explore roles based on their skills, interests, and location – all in one intuitive application.

🌐 Live Demo: [https://staff-merge.vercel.app](https://staff-merge.vercel.app)


## ✨ Features

- 🧾 **Post & manage job vacancies**
- 🎯 **Search and filter jobs** by title, location, or category
- 👤 **User authentication** for job seekers and recruiters
- 📄 **Apply for jobs** with a single click
- 📊 **Dashboard** for users to manage applications
- 🎨 **Responsive and modern UI**

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **TailwindCSS**
- React Router (for navigation)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** 
- **JWT Authentication**
- **RESTful API Integration**
  

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sujal7ss/StaffMerge.git
cd StaffMerge
```

### 2. Set up the Backend

```bash
cd backend
npm install
npm run dev
```

> Make sure to create a `.env` file in the `backend/` directory and add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
npm start
```

> The frontend should now run at `http://localhost:3000`

## 📁 Folder Structure

```
StaffMerge/
│
├── backend/         # Express backend (API, DB models, auth)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── .env
│
├── frontend/        # React frontend (pages, components, styling)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
├── package.json
└── README.md
```

Feel free to give this repo a ⭐ if you find it helpful!
