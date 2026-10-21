| Column        | Type         | Nullable | Default           | Constraint  | Why?            |
| ------------- | ------------ | -------- | ----------------- | ----------- | --------------- |
| id            | UUID         | ❌        | Generated         | Primary Key | Unique identity |
| username      | VARCHAR(100) | ❌        | —                 | —           | Display name    |
| email         | VARCHAR(255) | ❌        | —                 | UNIQUE      | Login identity  |
| password_hash | VARCHAR(255) | ❌        | —                 | —           | Secure password |
| created_at    | TIMESTAMP    | ❌        | CURRENT_TIMESTAMP | —           | Audit           |
| updated_at    | TIMESTAMP    | ❌        | CURRENT_TIMESTAMP | —           | Audit           |


CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

