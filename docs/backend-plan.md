# MEMORIA PLAN - BACKEND
---

### #1 Resources

- **users** -- account and identity data
- **categories** -- note groupings owned by a user
- **notes** -- the main content owned by a user

### #2 Ownership rules

- each category belongs to one user
- each note belongs to one user
- each note may belong to one category
- users can only access their own notes and categories

### Database Structure (MVP)

| users | categories | notes |
|-------|------------|-------|
| id | id | id |
| email | name | title |
| password_hash (nullable) | user_id | content |
| google_id (nullable) |  | user_id |
| display_name (nullable) |  | category_id (nullable) |
|  |  | created_at |
|  |  | updated_at |

**Foreign keys:**
`categories.user_id` → `users.id`
`notes.user_id` → `users.id`
`notes.category_id` → `categories.id`