-- Sample data for the University Exam Surveillance System

-- Departments
INSERT INTO `department` (`name`) VALUES 
('Computer Science'),
('Information Systems'),
('Mathematics'),
('Physics');

-- Formations (Academic Programs)
INSERT INTO `formation` (`level`, `speciality`) VALUES 
('L1', 'Computer Science'),
('L2', 'Computer Science'),
('L3', 'Computer Science'),
('M1', 'Information Systems'),
('M2', 'Information Systems');

-- Professors
INSERT INTO `professor` (`last_name`, `first_name`, `maiden_name`, `gender`, `status`, `grade`, `email_1`, `email_2`, `phone_1`, `phone_2`) VALUES 
('Smith', 'John', NULL, 'Male', 'Admin', 'Prof', 'john.smith@university.edu', NULL, '123456789', NULL),
('Johnson', 'Emily', 'Davis', 'Female', 'Admin', 'MCA', 'emily.johnson@university.edu', NULL, '234567890', NULL),
('Williams', 'Michael', NULL, 'Male', 'Admin', 'Prof', 'michael.williams@university.edu', NULL, '345678901', NULL),
('Brown', 'Sarah', 'Wilson', 'Female', 'Admin', 'MCB', 'sarah.brown@university.edu', NULL, '456789012', NULL),
('Davis', 'Robert', NULL, 'Male', 'Admin', 'MAA', 'robert.davis@university.edu', NULL, '567890123', NULL),
('Wilson', 'Jennifer', 'Taylor', 'Female', 'Admin', 'MAB', 'jennifer.wilson@university.edu', NULL, '678901234', NULL);

-- Users
INSERT INTO `user` (`professor_id`, `email`, `password_hash`, `role`) VALUES 
(1, 'john.smith@university.edu', '$2a$10$XFE0rQyZ5GfZmR0g5dHaQOlDuL9McQy6ERYwrJMU1TIJhDyRpKjbS', 'admin'), -- password: admin123
(2, 'emily.johnson@university.edu', '$2a$10$XFE0rQyZ5GfZmR0g5dHaQOlDuL9McQy6ERYwrJMU1TIJhDyRpKjbS', 'professor'), -- password: admin123
(3, 'michael.williams@university.edu', '$2a$10$XFE0rQyZ5GfZmR0g5dHaQOlDuL9McQy6ERYwrJMU1TIJhDyRpKjbS', 'professor'), -- password: admin123
(4, 'sarah.brown@university.edu', '$2a$10$XFE0rQyZ5GfZmR0g5dHaQOlDuL9McQy6ERYwrJMU1TIJhDyRpKjbS', 'professor'), -- password: admin123
(5, 'robert.davis@university.edu', '$2a$10$XFE0rQyZ5GfZmR0g5dHaQOlDuL9McQy6ERYwrJMU1TIJhDyRpKjbS', 'professor'), -- password: admin123
(6, 'jennifer.wilson@university.edu', '$2a$10$XFE0rQyZ5GfZmR0g5dHaQOlDuL9McQy6ERYwrJMU1TIJhDyRpKjbS', 'professor'); -- password: admin123

-- Professor-Department relationships
INSERT INTO `professor_department` (`professor_id`, `department_id`) VALUES 
(1, 1), -- John Smith - Computer Science
(2, 1), -- Emily Johnson - Computer Science
(3, 2), -- Michael Williams - Information Systems
(4, 1), -- Sarah Brown - Computer Science
(5, 2), -- Robert Davis - Information Systems
(6, 1); -- Jennifer Wilson - Computer Science

-- Modules
INSERT INTO `module` (`semester`, `title`, `title_abv`, `coeff`, `credit`, `unit`, `lecture_hours`, `tutorial_hours`, `lab_hours`) VALUES 
('S1', 'Introduction to Programming', 'CS101', 3, 6, 'UEF1', 21, 21, 21),
('S1', 'Data Structures', 'CS201', 3, 6, 'UEF1', 21, 21, 21),
('S2', 'Database Systems', 'CS301', 3, 5, 'UEF2', 21, 21, 21),
('S2', 'Software Engineering', 'CS401', 3, 6, 'UEF1', 21, 21, 0),
('S3', 'Information Systems', 'IS201', 2, 4, 'UEM', 21, 21, 0),
('S3', 'Artificial Intelligence', 'CS501', 3, 6, 'UEF2', 21, 21, 21);

-- Formation-Module relationships
INSERT INTO `formation_module` (`formation_id`, `module_id`) VALUES 
(1, 1), -- L1 - Introduction to Programming
(1, 2), -- L1 - Data Structures
(1, 3), -- L1 - Database Systems
(4, 4), -- M1 - Software Engineering
(1, 5), -- L1 - Information Systems
(4, 6); -- M1 - Artificial Intelligence

-- Rooms
INSERT INTO `room` (`name`, `capacity`, `location`) VALUES 
('A104', 60, 'Building A'),
('B201', 80, 'Building B'),
('C105', 40, 'Building C'),
('A201', 100, 'Building A'),
('B102', 50, 'Building B');

-- Exam Sessions
INSERT INTO `exam_session` (`session`, `start_date`, `end_date`) VALUES 
('Normal', '2025-06-15', '2025-06-30'),
('Resit', '2025-08-01', '2025-08-15');

-- Exams
INSERT INTO `exam` (`module_id`, `exam_session_id`, `date`, `duration`) VALUES 
(1, 1, '2025-06-15', 120), -- Introduction to Programming - Normal Session
(2, 1, '2025-06-15', 120), -- Data Structures - Normal Session
(3, 1, '2025-06-16', 120), -- Database Systems - Normal Session
(4, 1, '2025-06-16', 180), -- Software Engineering - Normal Session
(5, 1, '2025-06-17', 120), -- Information Systems - Normal Session
(6, 1, '2025-06-17', 180); -- Artificial Intelligence - Normal Session

-- Exam-Room relationships
INSERT INTO `exam_room` (`exam_id`, `room_id`) VALUES 
(1, 1), -- Introduction to Programming - A104
(2, 2), -- Data Structures - B201
(3, 3), -- Database Systems - C105
(4, 4), -- Software Engineering - A201
(5, 5), -- Information Systems - B102
(6, 4); -- Artificial Intelligence - A201

-- Teaching Assignments
INSERT INTO `teaching_assignment` (`professor_id`, `module_id`, `section`, `group`, `course_type`) VALUES 
(1, 1, 'S1', 'G1', 'Lecture'),    -- John Smith - Introduction to Programming - Lecture
(1, 1, 'S1', 'G1', 'Tutorial'),   -- John Smith - Introduction to Programming - Tutorial
(2, 2, 'S1', 'G1', 'Lecture'),    -- Emily Johnson - Data Structures - Lecture
(3, 3, 'S2', 'G1', 'Lecture'),    -- Michael Williams - Database Systems - Lecture
(4, 4, 'S2', 'G1', 'Lecture'),    -- Sarah Brown - Software Engineering - Lecture
(5, 5, 'S3', 'G1', 'Lecture'),    -- Robert Davis - Information Systems - Lecture
(6, 6, 'S3', 'G1', 'Lecture');    -- Jennifer Wilson - Artificial Intelligence - Lecture

-- Surveillance Assignments
INSERT INTO `surveillance` (`exam_id`, `professor_id`, `date`, `start_time`, `end_time`, `role`) VALUES 
(1, 1, '2025-06-15', '09:00:00', '11:00:00', 'Main'),       -- John Smith - Introduction to Programming - Main
(1, 2, '2025-06-15', '09:00:00', '11:00:00', 'Assistant'),  -- Emily Johnson - Introduction to Programming - Assistant
(2, 3, '2025-06-15', '14:00:00', '16:00:00', 'Main'),       -- Michael Williams - Data Structures - Main
(3, 4, '2025-06-16', '10:00:00', '12:00:00', 'Main'),       -- Sarah Brown - Database Systems - Main
(3, 5, '2025-06-16', '10:00:00', '12:00:00', 'Assistant'),  -- Robert Davis - Database Systems - Assistant
(4, 6, '2025-06-16', '14:00:00', '17:00:00', 'Main'),       -- Jennifer Wilson - Software Engineering - Main
(5, 1, '2025-06-17', '09:00:00', '11:00:00', 'Main'),       -- John Smith - Information Systems - Main
(6, 2, '2025-06-17', '14:00:00', '17:00:00', 'Main'),       -- Emily Johnson - Artificial Intelligence - Main
(6, 3, '2025-06-17', '14:00:00', '17:00:00', 'Assistant');  -- Michael Williams - Artificial Intelligence - Assistant

