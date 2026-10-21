# Why Feature-Based Architecture?

We chose Feature-Based Architecture because WriteSpace is expected to grow into multiple independent business domains:

- Authentication
- Documents
- Sharing
- Comments
- Notifications

Grouping files by feature keeps all related code together, reduces context switching, and allows teams to work independently on different business modules.

Shared concerns such as configuration, middleware, database connections, and utilities remain at the application level because they are reused across multiple features.

docs/
architecture/
feature-based-architecture.md
backend/
auth-feature.md
document-feature.md
api/
authentication-api.md
document-api.md
database/
erd.md
schema.md

# Document Feature

## Purpose

Responsible for creating, updating, retrieving and deleting documents.

---

## Folder Structure

documents/
controllers/
repository/
routes/
services/
validators/

---

## Layer Responsibilities

1️⃣ Controllers
Responsibility

Controllers are responsible for handling HTTP requests and responses.

Allowed
Read request parameters
Read request body
Read authenticated user
Call service
Return HTTP response
Not Allowed
SQL queries
Business logic
Validation
Password hashing
Example

POST /documents

↓

DocumentController

↓

DocumentService
2️⃣ Services
Responsibility

Contains all business logic.

Allowed
Validate business rules
Call repositories
Combine data
Handle workflows
Not Allowed
Express response handling
SQL queries
Example

Create Document

↓

Check owner exists

↓

Create document

↓

Return document
3️⃣ Repository
Responsibility

Repository is responsible only for communicating with PostgreSQL.

Allowed
SELECT
INSERT
UPDATE
DELETE
Not Allowed
Business rules
Authentication
Validation

Example

INSERT INTO documents(...)

Nothing else.

4️⃣ Routes
Responsibility

Maps URLs to controllers.

Example

POST /documents

↓

DocumentController.create()

Routes should remain extremely small.

5️⃣ Validators
Responsibility

Validate incoming request data before it reaches business logic.

Example

{
"title": ""
}

Check

Required fields
Length
Invalid values

before reaching the service.

Then...

For Auth

We write exactly the same document.

Because every feature follows the same architecture.
