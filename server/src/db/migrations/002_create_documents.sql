| Column     | Type         | Nullable | Default             | Constraint              |
| ---------- | ------------ | -------- | ------------------- | ----------------------- |
| id         | UUID         | ❌        | Backend generates   | Primary Key             |
| title      | VARCHAR(255) | ❌        | 'Untitled Document' | -                       |
| content    | TEXT         | ❌        | ''                  | -                       |
| owner_id   | UUID         | ❌        | -                   | Foreign Key → users(id) |
| created_at | TIMESTAMP    | ❌        | CURRENT_TIMESTAMP   | -                       |
| updated_at | TIMESTAMP    | ❌        | CURRENT_TIMESTAMP   | -                       |


CREATE TABLE documents (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Document',
    content TEXT NOT NULL DEFAULT '',
    owner_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE RESTRICT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);