-- ============================================
-- SQL SCRIPT: Add Role Column to Database
-- ============================================
-- This script adds a "role" column to your users table
-- Run this in your database (like Neon, PostgreSQL, etc.)

-- Step 1: Add the role column (default value is "user")
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Step 2: Make sure existing users have a role
UPDATE users 
SET role = 'user' 
WHERE role IS NULL;

-- Step 3: (Optional) Make yourself an admin!
-- Replace 'your-email@example.com' with YOUR email address
UPDATE users 
SET role = 'admin' 
WHERE user_email = 'your-email@example.com';

-- ============================================
-- HOW TO USE THIS:
-- ============================================
-- 1. Open your database (Neon, pgAdmin, etc.)
-- 2. Run this SQL script
-- 3. Don't forget to change 'your-email@example.com' to your actual email!
-- 4. Now you'll be an admin and can see the admin page!

