# 🎓 Role-Based Access Control - Explained Like You're 10!

## 🎭 What Are Roles?

Think of roles like **badges** at school:
- 👤 **"user"** = Regular student badge (can see their own stuff)
- 👑 **"admin"** = Teacher/Principal badge (can see everything!)

## 🏗️ How It Works (Step by Step)

### Step 1: Database Setup 📊
First, we need to add a "role" column to our database table (like adding a badge column to a student list).

**Run this SQL script:** `backend/add_role_column.sql`
- This adds a "role" column to your users table
- Everyone gets "user" by default
- You can make yourself "admin" by updating your email in the script!

### Step 2: When Someone Signs Up 🆕
- They automatically get the "user" role (like getting a student badge)
- This role is saved in the database
- The role is also put in their token (like writing it on their ID card)

### Step 3: When Someone Logs In 🔐
- We check their password
- We get their role from the database
- We put their role in the token (so we remember it)

### Step 4: Security Guards (Middleware) 🛡️
We created two "security guards":

1. **`verifyToken`** - Checks if you're logged in (do you have an ID card?)
2. **`isAdmin`** - Checks if you're an admin (do you have a teacher badge?)

### Step 5: Different Pages for Different Roles 🚪

**Regular Users:**
- Can see `/dashboard` (their own page)
- Can see their own info

**Admins:**
- Can see `/dashboard` (their own page)
- Can see `/admin` (special admin page!)
- Can see ALL users in the system!

## 🎮 How to Test It

### 1. Set Up the Database
```sql
-- Run this in your database
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';
UPDATE users SET role = 'admin' WHERE user_email = 'YOUR_EMAIL_HERE';
```

### 2. Start Your Servers
```bash
# Terminal 1: Backend
cd backend
node index.js

# Terminal 2: Frontend
cd frontend
npm run dev
```

### 3. Test as Regular User
1. Register a new account (you'll be a "user")
2. Login
3. You'll see the Dashboard
4. You WON'T see the Admin page link

### 4. Test as Admin
1. Make yourself admin in the database (see Step 1)
2. Login with your admin account
3. You'll see the Dashboard
4. You WILL see the "Go to Admin Page" button!
5. Click it to see all users!

## 📁 Files We Changed

### Backend (`backend/index.js`)
- ✅ Registration now gives everyone "user" role
- ✅ Login puts role in the token
- ✅ Created `verifyToken` middleware (security guard)
- ✅ Created `isAdmin` middleware (admin checker)
- ✅ Added `/auth/me` route (see your own info)
- ✅ Added `/admin/users` route (admins only!)

### Frontend
- ✅ Created `frontend/src/utils/auth.js` (helper to read roles from token)
- ✅ Updated `App.jsx`:
  - Dashboard shows your role
  - Created AdminPage component
  - Added admin route protection

## 🔑 Key Concepts

### Token = ID Card
- Contains: user ID + role
- Stored in: browser's localStorage
- Used to: prove who you are

### Middleware = Security Guard
- Checks your token before letting you in
- Blocks you if you don't have permission

### Role = Badge
- "user" = regular person
- "admin" = special person with powers

## 🎯 What You Learned!

1. ✅ How to add roles to database
2. ✅ How to store roles in JWT tokens
3. ✅ How to create middleware (security guards)
4. ✅ How to protect routes (only admins can enter!)
5. ✅ How to check roles on frontend
6. ✅ How to show different content based on role

## 🚀 Next Steps (Ideas!)

- Add more roles: "moderator", "premium_user", etc.
- Let admins delete users
- Let admins change other users' roles
- Add role-based styling (admins get gold text!)
- Create a settings page only admins can see

---

**Remember:** Roles are like badges - they tell the system what you're allowed to do! 🎖️

