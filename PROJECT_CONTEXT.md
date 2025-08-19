# StaffMerge - Complete Project Context
*A comprehensive overview of the StaffMerge job portal application for GPT context*

---

## 🎯 Project Overview
**StaffMerge** is a full-stack job portal application that connects job seekers with employers. It provides a platform for companies to post jobs and candidates to apply, with an admin panel for company management.

---

## 🏗️ Architecture Overview

### System Architecture
- **Frontend**: React.js SPA with Redux state management
- **Backend**: Node.js Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **File Storage**: Cloudinary for image uploads
- **Authentication**: JWT-based authentication
- **Deployment**: Vercel (both frontend and backend)

### High-Level Data Flow
```
User (React) → API Calls (Axios) → Express Routes → Controllers → Mongoose Models → MongoDB
                                      ↓
                              Middleware (Auth, Multer)
                                      ↓
                              Cloudinary (File Storage)
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18.2.0
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM 6.23.1
- **Styling**: Tailwind CSS + Shadcn/ui components
- **HTTP Client**: Axios 1.7.2
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **UI Components**: Radix UI primitives

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.19.2
- **Database**: MongoDB with Mongoose 8.4.1
- **Authentication**: JWT tokens (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **File Upload**: Multer 1.4.5-lts.1
- **Cloud Storage**: Cloudinary 2.3.0
- **Environment**: dotenv 16.4.5
- **CORS**: cors 2.8.5
- **Cookies**: cookie-parser 1.4.6

---

## 📊 Database Models

### User Model
```javascript
{
  fullname: String (required),
  email: String (required, unique),
  phoneNumber: Number (required),
  password: String (required, hashed),
  role: String (enum: ['student', 'recruiter'], required),
  profile: {
    bio: String,
    skills: [String],
    resume: String (Cloudinary URL),
    resumeOriginalName: String,
    company: ObjectId (ref: Company),
    profilePhoto: String (Cloudinary URL, default: "")
  },
  timestamps: true
}
```

### Company Model
```javascript
{
  name: String (required, unique),
  description: String,
  website: String,
  location: String,
  logo: String (Cloudinary URL),
  userId: ObjectId (ref: User, required),
  timestamps: true
}
```

### Job Model
```javascript
{
  title: String (required),
  description: String (required),
  requirements: [String],
  salary: Number (required),
  experienceLevel: Number (required),
  location: String (required),
  jobType: String (required),
  position: Number (required),
  company: ObjectId (ref: Company, required),
  created_by: ObjectId (ref: User, required),
  applications: [ObjectId (ref: Application)],
  timestamps: true
}
```

### Application Model
```javascript
{
  job: ObjectId (ref: Job, required),
  applicant: ObjectId (ref: User, required),
  status: String (enum: ['pending', 'accepted', 'rejected'], default: 'pending'),
  timestamps: true
}
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure
- **Secret**: Environment variable `SECRET_KEY`
- **Expiration**: 1 day
- **Storage**: HTTP-only secure cookies
- **Payload**: `{ userId: user._id }`

### Protected Routes
- **isAuthenticated middleware**: Validates JWT token
- **Role-based access**: Different routes for 'student' vs 'recruiter'

---

## 🌐 API Endpoints

### User Routes (`/api/v1/user`)
- `POST /register` - User registration with file upload
- `POST /login` - User login
- `GET /logout` - User logout
- `POST /profile/update` - Update user profile with file upload

### Company Routes (`/api/v1/company`)
- `POST /register` - Register new company (authenticated)
- `GET /get` - Get all companies for authenticated user
- `GET /get/:id` - Get company by ID (authenticated)
- `PUT /update/:id` - Update company details with file upload (authenticated)

### Job Routes (`/api/v1/job`)
- `POST /post` - Post new job (authenticated)
- `GET /get` - Get all jobs (public)
- `GET /getadminjobs` - Get jobs posted by admin (authenticated)
- `GET /get/:id` - Get job by ID (public)

### Application Routes (`/api/v1/application`)
- `GET /apply/:id` - Apply to a job (authenticated)
- `GET /get` - Get user's applied jobs (authenticated)
- `GET /:id/applicants` - Get applicants for a job (authenticated)
- `POST /status/:id/update` - Update application status (authenticated)

---

## 🔄 Data Flow & Business Logic

### User Registration Flow
1. User submits registration form with profile photo
2. File uploaded to Cloudinary via Multer
3. Password hashed with bcryptjs
4. User saved to MongoDB
5. JWT token generated and set in cookie

### Job Posting Flow
1. Recruiter creates job posting
2. Job linked to company and creator
3. Job saved with all requirements
4. Available for students to view and apply

### Application Flow
1. Student views job listings
2. Clicks "Apply" on desired job
3. Application created linking user and job
4. Recruiter can view applicants
5. Recruiter can update application status

### File Upload Flow
1. Multer middleware handles file upload
2. DataURI converts file to base64
3. Cloudinary uploads file and returns URL
4. URL stored in database

---

## 🎨 Frontend Structure

### Redux Store Structure
```javascript
store: {
  auth: { user, token, isAuthenticated },
  job: { allJobs, singleJob, adminJobs },
  company: { companies, singleCompany },
  application: { appliedJobs, applicants }
}
```

### Key Components
- **Auth**: Login, Signup forms
- **Job Management**: Job listings, job details, job posting
- **Company Management**: Company registration, company profiles
- **Application System**: Apply functionality, applicant tracking
- **Admin Panel**: Job management, applicant review

### State Management
- **Redux Toolkit**: Global state management
- **Redux Persist**: Persist state across sessions
- **RTK Query**: API integration (implied by structure)
- **Local State**: Form handling with React hooks


## 🎯 Key Features

1. **Multi-role System**: Students and Recruiters
2. **Company Management**: Create and manage company profiles
3. **Job Posting**: Post jobs with detailed requirements
4. **Application System**: Apply to jobs and track status
5. **File Management**: Resume and profile photo uploads
6. **Real-time Updates**: Application status notifications
7. **Responsive Design**: Mobile-friendly interface
8. **Admin Dashboard**: Manage jobs and applications

---

## 🔍 Integration Points

### Frontend-Backend Communication
- **Base URL**: Configurable via environment variables
- **Authentication**: JWT tokens in cookies
- **File Upload**: Multipart form data
- **Error Handling**: Standardized error responses

### Third-party Services
- **Cloudinary**: Image and file storage
- **MongoDB Atlas**: Database hosting
- **Vercel**: Application deployment

---

This comprehensive overview provides all the context needed to understand, modify, or extend the StaffMerge application. The architecture follows modern best practices with clear separation of concerns, scalable file structure, and production-ready configurations.
