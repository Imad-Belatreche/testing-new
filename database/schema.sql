-- Database Schema for University Exam Surveillance Management System

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Hashed password
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  role ENUM('admin', 'professor') NOT NULL DEFAULT 'professor',
  department_id INT,
  office_location VARCHAR(50),
  bio TEXT,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Departments Table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Academic Programs Table
CREATE TABLE academic_programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE, -- e.g., L1, M1
  department_id INT,
  description TEXT,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Modules Table
CREATE TABLE modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  program_id INT,
  department_id INT,
  credits INT NOT NULL,
  description TEXT,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES academic_programs(id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Rooms Table
CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(20) NOT NULL UNIQUE,
  building VARCHAR(50) NOT NULL,
  capacity INT NOT NULL,
  status ENUM('available', 'under_maintenance') NOT NULL DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Room Features Table
CREATE TABLE room_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  feature VARCHAR(50) NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  UNIQUE KEY (room_id, feature)
);

-- Exam Sessions Table
CREATE TABLE exam_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  program_id INT,
  description TEXT,
  status ENUM('upcoming', 'active', 'completed') NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES academic_programs(id)
);

-- Exams Table
CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  session_id INT NOT NULL,
  room_id INT NOT NULL,
  exam_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration INT NOT NULL, -- in minutes
  main_invigilator_id INT,
  assistant_invigilator_id INT,
  notes TEXT,
  status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id),
  FOREIGN KEY (session_id) REFERENCES exam_sessions(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  FOREIGN KEY (main_invigilator_id) REFERENCES users(id),
  FOREIGN KEY (assistant_invigilator_id) REFERENCES users(id)
);

-- User Permissions Table
CREATE TABLE user_permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  permission VARCHAR(50) NOT NULL, -- e.g., 'view_exams', 'create_exams', etc.
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, permission)
);

-- Notifications Table
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages Table
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  subject VARCHAR(100),
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (recipient_id) REFERENCES users(id)
);

-- User Activity Log
CREATE TABLE activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes for better performance
CREATE INDEX idx_exams_date ON exams(exam_date);
CREATE INDEX idx_exams_module ON exams(module_id);
CREATE INDEX idx_exams_session ON exams(session_id);
CREATE INDEX idx_exams_main_invigilator ON exams(main_invigilator_id);
CREATE INDEX idx_exams_assistant_invigilator ON exams(assistant_invigilator_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_messages_recipient ON messages(recipient_id, is_read);

USE `project_db`;
-- 1. Tables with Cascading Foreign Keys and Indexes
CREATE TABLE `department` (
    `department_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE INDEX `idx_department_name` ON `department` (`name`);

CREATE TABLE `formation` (
    `formation_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `level` ENUM('L1', 'L2', 'L3', 'M1', 'M2') NOT NULL,
    `speciality` VARCHAR(255) NOT NULL
);
CREATE INDEX `idx_formation_level` ON `formation` (`level`);

CREATE TABLE `professor` (
    `professor_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `last_name` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `maiden_name` VARCHAR(255),
    `gender` ENUM('Male', 'Female') NOT NULL,
    `status` ENUM('Admin', 'Retired', 'Mutation', 'MED') NOT NULL,
    `grade` ENUM('Prof', 'MCA', 'MCB', 'MAA', 'MAB') NOT NULL,
    `email_1` VARCHAR(255) NOT NULL UNIQUE,
    `email_2` VARCHAR(255) UNIQUE,
    `phone_1` VARCHAR(255) NOT NULL UNIQUE,
    `phone_2` VARCHAR(255) UNIQUE
);
CREATE INDEX `idx_professor_last_first` ON `professor` (`last_name`, `first_name`);

CREATE TABLE `user` (
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `professor_id` BIGINT UNSIGNED NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'professor') NOT NULL,
    FOREIGN KEY (`professor_id`) 
        REFERENCES `professor`(`professor_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_user_email` ON `user` (`email`);

CREATE TABLE `module` (
    `module_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `semester` VARCHAR(10) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `title_abv` VARCHAR(50) NOT NULL,
    `coeff` TINYINT UNSIGNED NOT NULL,
    `credit` TINYINT UNSIGNED NOT NULL,
    `unit` ENUM('UEF1', 'UEF2', 'UEM', 'UET', 'UED') NOT NULL,
    `lecture_hours` FLOAT NOT NULL,
    `tutorial_hours` FLOAT NOT NULL,
    `lab_hours` FLOAT
);
CREATE INDEX `idx_module_title_abv` ON `module` (`title_abv`);

-- Junction Table: Formation ↔ Module (Many-to-Many)
CREATE TABLE `formation_module` (
    `formation_id` BIGINT UNSIGNED NOT NULL,
    `module_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`formation_id`, `module_id`),
    FOREIGN KEY (`formation_id`) 
        REFERENCES `formation`(`formation_id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`module_id`) 
        REFERENCES `module`(`module_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_formation_module_module` ON `formation_module` (`module_id`);

CREATE TABLE `exam_session` (
    `exam_session_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `session` ENUM('Normal', 'Special', 'Resit') NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL
);
CREATE INDEX `idx_exam_session_dates` ON `exam_session` (`start_date`, `end_date`);

CREATE TABLE `room` (
    `room_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `capacity` TINYINT UNSIGNED NOT NULL,
    `location` VARCHAR(255) NOT NULL
);
CREATE INDEX `idx_room_name` ON `room` (`name`);

CREATE TABLE `exam` (
    `exam_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `module_id` BIGINT UNSIGNED NOT NULL,
    `exam_session_id` BIGINT UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `duration` TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (`module_id`) 
        REFERENCES `module`(`module_id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`exam_session_id`) 
        REFERENCES `exam_session`(`exam_session_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_exam_module` ON `exam` (`module_id`);
CREATE INDEX `idx_exam_date` ON `exam` (`date`);

-- Junction Table: Exam ↔ Room (Many-to-Many)
CREATE TABLE `exam_room` (
    `exam_id` BIGINT UNSIGNED NOT NULL,
    `room_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`exam_id`, `room_id`),
    FOREIGN KEY (`exam_id`) 
        REFERENCES `exam`(`exam_id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`room_id`) 
        REFERENCES `room`(`room_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_exam_room_room` ON `exam_room` (`room_id`);

CREATE TABLE `teaching_assignment` (
    `assignment_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `professor_id` BIGINT UNSIGNED NOT NULL,
    `module_id` BIGINT UNSIGNED NOT NULL,
    `section` VARCHAR(50) NOT NULL,
    `group` VARCHAR(50) NOT NULL,
    `course_type` ENUM('Lecture', 'Tutorial', 'Lab') NOT NULL,
    FOREIGN KEY (`professor_id`) 
        REFERENCES `professor`(`professor_id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`module_id`) 
        REFERENCES `module`(`module_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_teaching_professor` ON `teaching_assignment` (`professor_id`);
CREATE INDEX `idx_teaching_module` ON `teaching_assignment` (`module_id`);

CREATE TABLE `surveillance` (
    `surveillance_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `exam_id` BIGINT UNSIGNED NOT NULL,
    `professor_id` BIGINT UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `role` ENUM('Main', 'Assistant') NOT NULL,
    FOREIGN KEY (`exam_id`) 
        REFERENCES `exam`(`exam_id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`professor_id`) 
        REFERENCES `professor`(`professor_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_surveillance_exam` ON `surveillance` (`exam_id`);
CREATE INDEX `idx_surveillance_professor` ON `surveillance` (`professor_id`);

-- Junction Table: Professor ↔ Department (Many-to-Many)
CREATE TABLE `professor_department` (
    `professor_id` BIGINT UNSIGNED NOT NULL,
    `department_id` BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (`professor_id`, `department_id`),
    FOREIGN KEY (`professor_id`) 
        REFERENCES `professor`(`professor_id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`department_id`) 
        REFERENCES `department`(`department_id`)
        ON DELETE CASCADE
);
CREATE INDEX `idx_prof_dept_department` ON `professor_department` (`department_id`);

