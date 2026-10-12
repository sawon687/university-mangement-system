# Application Route Hierarchy

## Public Routes
/                        → Home Page
/about                   → About Us
/contact                 → Contact Us
/programs                → Programs Catalog
/service                 → Services Page

## Authentication Routes
/login                   → User Login
/register                → User Registration
/verify-account          → OTP / Email Verification
/forgot-password         → Password Reset Request

## Admin Dashboard (Protected - Admin Only)
/admin                   → Admin Overview
/admin/courses           → Manage Courses
/admin/departments       → Manage Departments
/admin/programs          → Manage Academic Programs
/admin/semesters          → Manage Semesters
/admin/student-admission → Review Admissions
/admin/users             → Manage All Users

## Instructor Dashboard (Protected - Instructor Only)
/instructor              → Instructor Overview
/instructor/course       → Assigned Courses
/instructor/exam         → Exams & Assessments
/instructor/profile      → Instructor Profile

## Student Dashboard (Protected - Student Only)
/student                 → Student Overview
/student/admission       → My Admission Application
/student/my-payments     → Payment History & Tuition
/student/my-result       → Exam Results
/student/my-semester     → Current Semester Details
