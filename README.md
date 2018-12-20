# Buvie

## What is Buvie?

Buvie is a platform where users can find other people with similar taste in movies and plan to catch a movie with them!

## Prerequisites

Buvie requires Node.js v6.0+ to run.

## Installing
Buvie requires Node.js v6.0+ to run.
Install the dependencies and devDependencies and start the server.

```
npm install
```

## Running the tests

To run front-end or back-end tests, simply run `npm test` in the terminal.

## Schema

### User

```js
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
    unique: true
  },
  googleId: {
    type: String,
    default: ''
  },
  genres: [
    {
      type: String
    }
  ],
  movies: [
    ref: Movie
    movieId
  ],
  location: {
    city: String,
    coordinates: [lat, lng]
  },
  geometry: {
    type: "Point",
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  popcorned: [{
    type: userId, 
    ref: User 
  }],
  matched: [
    {
      _id: {
        type: userId, 
        ref: User 
      },
      chatroom: {
        type: conversationId, 
        ref: Conversation 
      }
    }
  ],
  ignored: [{ 
    type: userId, 
    ref: User 
  }],
  whoUserPopcorned: [{ 
    type: userId, 
    ref: User 
  }],
  profilePicture: String,
  notifications: [
    {
      _id: { 
        type: userId, 
        ref: User 
      },
      notificationType: String,
      date: { 
        type: Date, 
        default: Date.now 
      }
    }
  ],
  notificationCheck: {
    type: Date,
    default: Date.now
  }
}
```

### Movie

```js
{
  title: String,
  genre: String,
  poster: String,
  users: [{ 
    type: userId, 
    ref: User 
  }],
  imdbID: String
}
```

### Conversation

```js
{
  matched: [{ 
    type: userId, 
    ref: User 
  }],
  messages: [{
    message: String,
    handle: String,
    room: { 
      type: conversationId, 
      ref: Conversation
    }
  }]
}
```

### Geoschema

```js
{
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
}
```

## API Overview

```text
/api
.
├── /auth
│   └── GET
│       ├── /google
│       ├── /google/redirect
│   └── POST
│       ├── /login
│       └── /refresh
├── /users
│   └── GET
│   └── GET /:id
│   └── POST
│       └── /
├── /main
│   └── GET
│       ├── /location
│       ├── /matches/:id
│       ├── /notifications/:id
│       ├── /popcorn/:id
│       └── /profilePicture/:id
│   └── PUT
│       ├── /ignore/:id
│       ├── /ignore/nevermind/:id
│       ├── /location/:id
│       ├── /notifications/time/:id
│       └── /popcorn
│   └── PUT /:id
│   └── POST
│       └── /profilePicture/:id
```

### POST `/api/auth/login`

```js
// req.body
{
  username: String,
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
### PUT `/api/main/:id`

```js
// req.body
{
  genres: [String],
  movies: [{type: MovieId, ref: Movies}]
}

// res.body
{
  [
    username: String,
  _id: UserId,
  genres: [String],
  movies: [{type: MovieId, ref: Movies}]            
}
```

### GET `/api/main/`

```js
// res.body
{
  [
    username: String,
    _id: UserId,
    genres: [String],
    movies: [{type: MovieId, ref: Movies}]
  ]
}
```
### PUT `/api/main/ignore/:id`

```js
// req.body
{
  userId: userId
}

// res.body
{
  status: 204
}
```
### PUT `/api/main/ignore/nevermind/:id`

```js
// req.params
{
  id: userId
}

// res.body
{
  status: 204
}

```

### PUT `/api/main/popcorn`

```js


// req.body
{
  userId: userId
}

// res.body
{
  status: 204
}

```

### GET `/api/main/popcorn/:id`

```js


// req.params
{
  userId: userId
}

// res.body
{
  popcorned: [{User: Object}],
  pendingPopcorn: [{User: Object}]
}

```

### GET `/api/main/location/?lat:{NUMBER}&lng:{NUMBER}`

```js
// req.query
{
  lat: Number,
  lng: Number
}

// res.body
[
  {User: Object}  
]
```



### PUT `/api/main/location/:id`

```js
// req.body
{
  city: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
}

// res.body
{
  User: Object;
}

```

### GET `/api/main/matches/:id`

```js

// res.body
{
  [
    _id: UserId
    username: String
    chatroom: ConversationId    
  ]
}
```

### GET `/api/main/notifications/:id`

```js
// req.params
{
  id: ID
}

// res.body
[
  {
    _id: Number,
    message: String,
    date: Number,
    type: String                      
  }
]
```

### PUT `/api/main/notifications/time/:id`

```js
// req.params
{
  id: ID
}

// res.body
[
  User: Object;
]
```

### GET `/api/main/profilePicture/:id`

```js

// res.body
{
    _id: UserId
    profilePicture: String
}
```

### POST `/api/main/profilePicture/:id`

```js
// req.body
{
    _id: UserId
    profilePicture: String
}

// res.body
{
    _id: UserId,
    username: String,    
    profilePicture: String
}
```

## Built With

* [Node](https://nodejs.org/en/) - Run-time environment
* [Express](https://expressjs.com/) - Web application framework
* [MongoDB](https://www.mongodb.com/) - Database
* [Mongoose](https://mongoosejs.com/) - Data modeling
* [Passport](http://www.passportjs.org/docs/) - Authentication
* [JWT](https://jwt.io/) - Authentication
* [OAuth 2.0](https://oauth.net/2/) - Authentication
* [Mocha](https://mochajs.org/) - Testing 
* [Chai](https://www.chaijs.com/) - Testing
* [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/intro) - Location API


## Authors

* **Nikolas Melgarejo** - *Full-Stack* - [NikolasMSomething](https://github.com/NikolasMsomething)

* **Cameron Hatch** - *Full-Stack* - [CameronHatch92](https://github.com/CameronHatch92)

* **Kent Tokunaga** - *Full-Stack* - [kenttoku](https://github.com/kenttoku)

* **Joe Pena** - *Full-Stack* - [Joe-Pena](https://github.com/Joe-Pena)

See also the list of [contributors](https://github.com/thinkful-ei24/buvie-server/graphs/contributors) who participated in this project.

## Acknowledgments

* Jesse Heaslip, Tauhida Parveen, Joe Turner, Chris Klanac, Rich Greenhill, Capi Etheriel, Brandon Hinshaw