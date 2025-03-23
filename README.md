# University Exam Surveillance Management System

A comprehensive system for managing university exam surveillance, including admin dashboard and professor portal.

## Features

- **Authentication System**: Secure login for admins and professors
- **Admin Dashboard**: Manage professors, modules, rooms, and exam sessions
- **Professor Portal**: View personalized schedules and receive notifications
- **Exam Session Planner**: Calendar view with exam slots and assigned invigilators
- **Surveillance Assignment Board**: Grid showing professors and their assignments
- **Report Generator**: Export exam plans and surveillance schedules
- **Active Users Display**: See currently active professors and send direct messages

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js (v18.17.0 or later)
- npm (v9.0.0 or later) or yarn (v1.22.0 or later)
- MySQL (v8.0 or later)

## Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd university-exam-surveillance
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
# Database
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=project_db
MYSQL_SSL=true  # Set to false to disable SSL

# Authentication
JWT_SECRET=your_jwt_secret_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3.1. SSL Configuration for MySQL

The application is configured to connect to MySQL using SSL for secure communication. The CA certificate is stored in the `certs` directory.

If you need to update the CA certificate:

1. Replace the content of `certs/ca-certificate.pem` with your new certificate.
2. Restart the application.

For local development without SSL, you can modify the `lib/db.ts` file to disable SSL by removing or commenting out the `ssl` configuration.

### 4. Set Up the Database

1. Create a MySQL database:

\`\`\`sql
CREATE DATABASE project_db;
\`\`\`

2. Run the database schema script:

\`\`\`bash
mysql -u root -p project_db < database/schema.sql
\`\`\`

3. (Optional) Seed the database with sample data:

\`\`\`bash
mysql -u root -p project_db < database/seed.sql
\`\`\`

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000).

### 6. Build for Production

\`\`\`bash
npm run build
\`\`\`

### 7. Start the Production Server

\`\`\`bash
npm start
\`\`\`

## Default Login Credentials

- **Admin**:
  - Email: john.smith@university.edu
  - Password: admin123

- **Professor**:
  - Email: emily.johnson@university.edu
  - Password: admin123

## Database Schema

The system uses a relational database with the following key tables:

- `department`: University departments
- `formation`: Academic programs (L1, L2, L3, M1, M2)
- `professor`: Professor information
- `user`: User accounts linked to professors
- `module`: Academic modules
- `formation_module`: Junction table for formations and modules
- `exam_session`: Exam periods (Normal, Special, Resit)
- `room`: Exam rooms
- `exam`: Scheduled exams
- `exam_room`: Junction table for exams and rooms
- `teaching_assignment`: Professor teaching assignments
- `surveillance`: Exam surveillance duties
- `professor_department`: Junction table for professors and departments

## Project Structure

- `/app`: Next.js App Router pages and layouts
- `/components`: React components
- `/lib`: Utility functions and helpers
- `/database`: Database schema and seed files
- `/public`: Static assets

## Security Measures

- Password hashing and salting using bcrypt
- JWT for authentication
- Input validation and sanitization
- Protection against XSS and CSRF attacks
- Secure HTTP-only cookies

## License

This project is licensed under the MIT License - see the LICENSE file for details.

