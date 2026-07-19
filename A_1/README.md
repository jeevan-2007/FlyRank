# Task API

A small Express API for managing in-memory tasks.

## Requirements

- Node.js
- npm

## Install

```bash
npm install
```

## Run

```bash
node server.js
```

The server runs on `http://localhost:3000`.

## Data Model

Each task has this shape:

```json
{
  "id": 1,
  "title": "Learn Express",
  "done": false
}
```

## HTTP Endpoints

### 1. API Info

`GET /`

Returns basic API metadata.

Example request:

```bash
curl http://localhost:3000/
```

Example response:

```json
{
  "name": "Task API",
  "version": "1.0",
  "endpoints": ["/tasks"]
}
```

### 2. Health Check

`GET /health`

Returns the service status.

Example request:

```bash
curl http://localhost:3000/health
```

Example response:

```json
{
  "status": "ok"
}
```

### 3. Get All Tasks

`GET /tasks`

Returns all tasks currently stored in memory.

Example request:

```bash
curl http://localhost:3000/tasks
```

Example response:

```json
[
  {
    "id": 1,
    "title": "Learn Express",
    "done": false
  },
  {
    "id": 2,
    "title": "Build Task API",
    "done": true
  }
]
```

### 4. Get a Task by ID

`GET /tasks/:id`

Returns a single task by numeric ID.

Example request:

```bash
curl http://localhost:3000/tasks/1
```

Success response:

```json
{
  "id": 1,
  "title": "Learn Express",
  "done": false
}
```

If the task does not exist, the API returns:

```json
{
  "error": "Task 1 not found"
}
```

with HTTP status `404`.

### 5. Create a Task

`POST /tasks`

Creates a new task.

Request body:

```json
{
  "title": "Write documentation"
}
```

Example request:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Write documentation"}'
```

Success response:

```json
{
  "id": 4,
  "title": "Write documentation",
  "done": false
}
```

Validation error:

```json
{
  "error": "Title is required"
}
```

with HTTP status `400`.

### 6. Update a Task

`PUT /tasks/:id`

Updates a task's `title`, `done`, or both.

Request body examples:

```json
{
  "title": "Updated task title"
}
```

```json
{
  "done": true
}
```

```json
{
  "title": "Updated task title",
  "done": true
}
```

Example request:

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'
```

Success response:

```json
{
  "id": 1,
  "title": "Learn Express",
  "done": true
}
```

Validation errors:

- Empty body:

```json
{
  "error": "Request body cannot be empty"
}
```

- Invalid `title`:

```json
{
  "error": "Title is required"
}
```

- Invalid `done` value:

```json
{
  "error": "Done must be a boolean"
}
```

If the task does not exist, the API returns `404`:

```json
{
  "error": "Task 1 not found"
}
```

### 7. Delete a Task

`DELETE /tasks/:id`

Deletes a task by numeric ID.

Example request:

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

Success response:

```json
{
  "message": "Task 1 deleted"
}
```

If the task does not exist, the API returns:

```json
{
  "error": "Task 1 not found"
}
```

with HTTP status `404`.

## Notes

- Data is stored in memory, so restarting the server resets the task list.
- IDs are generated automatically.
- The API expects JSON requests for `POST` and `PUT`.