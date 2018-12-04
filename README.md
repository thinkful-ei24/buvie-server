## Schema

### User

```
{
  username: {
    type: String,
    required: true,
    unique: true
    },
   password: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique: true,
    validate:  [validateEmail,'Validation of `{PATH}` failed with value `{VALUE}`']
   },
   genres: [
        {
            type: String
        }
   ],
   movies: [
        Ref Movie
        movieId
   ]
}
```

### Movie

{
title: String,
genre: String,
poster: String
}

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── GET
│   └── GET/:id
│   └── POST
│       └── /
├── /
```

### POST `/api/auth/login`

```js
// req.body
{
  email: String,
  password: String
}

// res.body
{
  authToken: String
}
```

### POST `/api/auth/refresh`

```js
// req.header
Authorization: Bearer ${token}

// res.body
{
  authToken: ${token}
}
```

### GET `/api/users/`

```js
// req.query
{
  ?
}

// res.body
[
    {
        username: String,
        movies: [],
        genres: String
    }
]
```

### GET `/api/users/:id`

```js
// req.params
{
  id: ID
}

// res.body
    {
        username: String,
        movies: [],
        genres: String
    }
```

### POST `/api/users/`

```js
// req.body
{
  email: String,
  username: String,
  password: String
}

// res.body
{
  name: String,
  username: String
}
```

### PUT `/api/users/:id`

```js
// req.body
{
  genres: [String],
  movies: [ID]
}

// res.body
{
   genres: [String],
   movies: [ID]
}
```
