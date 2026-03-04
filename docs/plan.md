# MEMORIA PLAN

***This plan lists features for the project's MVP (Mininmum Viable Product)***

---
### #1 User accounts (required)

Users must be able to have private knowledge bases.

Features:

- Register account
- Login
- Logout
- Session authentication
- Password hashing (bcrypt)

This demonstrates **authentication and security**

---
### #2 Notes system (core feature)

Users must be able to:

- Create a note
- View all their notes
- View a single note
- Edit a note
- Delete a note

That is the classic **CRUD cycle**

---
### #3 Categories for organization

A knowledge base becomes useful when notes can be grouped.

Features:

- Create categories
- Assign notes to categories
- Filter notes by category

---
### #4 Ownership security

Users must **only see their own notes**.

Example:

***User A cannot access User B's notes.***

This is enforced with:
`notes.user_id`

Every query filters by the logged-in user.

This demonstrates **authorization**, not just authentication.

---
### #5 React frontend

The UI can be minimal.

Pages:

**Home page** (if logged in → notes dashboard)
**Register page**
**Login page**
**Notes dashboard**
**Create note page**
**Edit note page**

---
## Database Structure (MVP)

| users | categories | notes |
|-------|------------|-------|
| id | id | id |
| email (unique) | name | title |
| password_hash (nullable) | user_id | content |
| google_id (nullable, unique) |  | user_id |
| display_name (nullable) |  | category_id (nullable) |
|  |  | created_at |
|  |  | updated_at |

---
## API Endpoints (MVP)

**Google Auth:**
```
GET /auth/google
GET /auth/google/callback
```

**Authentication:**
```
POST /register
POST /login
POST /logout
GET /me
```

**Notes:**
```
GET /notes
GET /notes/:id
POST /notes
PUT /notes/:id
DELETE /notes/:id
```

**Categories:**
```
GET /categories
POST /categories
```

---
## Deployment

Server → Render Web Service
Client → Render Static Site
PostgreSQL → Render database

### Nice-to-have features (Optional)

- Search notes
- Markdown formatting
- Sort notes by date
- Edit categories
- Dark mode