//HASH FOR PASSWORD123

const users = [
  {
    _id: '000000000000000000000001',
    username: 'username',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'example@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333301', '333333333333333333333305', '333333333333333333333311']
  },
  {
    _id: '000000000000000000000002',
    username: 'usernameB',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'exampleB@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333302', '333333333333333333333305', '333333333333333333333310']
  }
];

const conversations = [
  {
    _id: '222222222222222222222201',
    matched: ['000000000000000000000002', '000000000000000000000001'],
    messages: [
      {
        message: 'hello',
        handle: 'username',
        room: '222222222222222222222201'
      },
      {
        message: 'hey',
        handle: 'usernameB',
        room: '222222222222222222222201'
      }
    ]
  }
]

const movies = [
  {
    _id: '333333333333333333333301',
    title: 'Get Out (2017)',
    genre: 'Horror',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg',
		users: ['000000000000000000000001'],
		imdbID: 'tt5052448'
  },
  {
    _id: '333333333333333333333302',
    title: 'The Exorcist (1973)',
    genre: 'Horror',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjhmMGMxZDYtMTkyNy00YWVmLTgyYmUtYTU3ZjcwNTBjN2I1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: ['000000000000000000000002'],
		imdbID: 'tt0070047'
  },
  {
    _id: '333333333333333333333303',
    title: 'Rosemary\'s Baby (1968)',
    genre: 'Horror',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjE3NzE4NzkyNl5BMl5BanBnXkFtZTgwNTYyODgwNzE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0063522'
  },
  {
    _id: '333333333333333333333304',
    title: 'Pan\'s Labyrinth (2006)',
    genre: 'Horror',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTU3ODg2NjQ5NF5BMl5BanBnXkFtZTcwMDEwODgzMQ@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0457430' 
  },
  {
    _id: '333333333333333333333305',
    title: 'The Silence of the Lambs (1991)',
    genre: 'Horror',
    poster: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
		users: ['000000000000000000000001', '000000000000000000000002'],
		imdbID: 'tt0102926'
  },
  {
    _id: '333333333333333333333306',
    title: 'Star Wars: Episode VII - The Force Awakens (2015)',
    genre: 'Action & Adventure',
    poster: 'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt2488496'
  },
  {
    _id: '333333333333333333333307',
    title: 'Mad Max: Fury Road (2015)',
    genre: 'Action & Adventure',
    poster: 'https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt1392190'
  },
  {
    _id: '333333333333333333333308',
    title: 'Baby Driver (2017)',
    genre: 'Action & Adventure',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt3890160'
  },
  {
    _id: '333333333333333333333309',
    title: 'The Dark Knight (2008)',
    genre: 'Action & Adventure',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0468569'
  },
  {
    _id: '333333333333333333333310',
    title: 'Jaws (1975)',
    genre: 'Action & Adventure',
    poster: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
		users: ['000000000000000000000002'],
		imdbID: 'tt0073195' 
  },
  {
    _id: '333333333333333333333311',
    title: 'The Philadelphia Story (1940)',
    genre: 'Comedy',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjQ4ZDA4NGMtMTkwYi00NThiLThhZDUtZTEzNTAxOWYyY2E4XkEyXkFqcGdeQXVyMjUxODE0MDY@._V1_SX300.jpg',
		users: ['000000000000000000000001'],
		imdbID: 'tt0032904'
  },
  {
    _id: '333333333333333333333312',
    title: 'Monty Python and the Holy Grail (1975)',
    genre: 'Comedy',
    poster: 'https://m.media-amazon.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0071853'
  },
  {
    _id: '333333333333333333333313',
    title: 'Back to the Future (1985)',
    genre: 'Comedy',
    poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0088763'
  },
  {
    _id: '333333333333333333333314',
    title: 'Modern Times (1936)',
    genre: 'Comedy',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0027977'
  },
  {
    _id: '333333333333333333333315',
    title: 'The Hangover (2009)',
    genre: 'Comedy',
    poster: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt1119646'
  },
  {
    _id: '333333333333333333333316',
    title: 'Moonlight (2016)',
    genre: 'Drama',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt4975722'
  },
  {
    _id: '333333333333333333333317',
    title: 'Casablanca (1942)',
    genre: 'Drama',
    poster: 'https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0034583'
  },
  {
    _id: '333333333333333333333318',
    title: 'The Godfather (1972)',
    genre: 'Drama',
    poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0068646'
  },
  {
    _id: '333333333333333333333319',
    title: 'Argo (2012)',
    genre: 'Drama',
    poster: 'https://m.media-amazon.com/images/M/MV5BNzljNjY3MDYtYzc0Ni00YjU0LWIyNDUtNTE0ZDRiMGExMjZlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt1024648'
  },
  {
    _id: '333333333333333333333320',
    title: 'Citizen Kane (1941)',
    genre: 'Drama',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0033467'
  },
  {
    _id: '333333333333333333333321',
    title: 'Psycho (1960)',
    genre: 'Thriller',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0054215'
  },
  {
    _id: '333333333333333333333322',
    title: 'Taken (2008)',
    genre: 'Thriller',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTM4NzQ0OTYyOF5BMl5BanBnXkFtZTcwMDkyNjQyMg@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0936501'
  },
  {
    _id: '333333333333333333333323',
    title: 'A Quiet Place (2018)',
    genre: 'Thriller',
    poster: 'https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt6644200'
  },
  {
    _id: '333333333333333333333324',
    title: 'Hell or High Water (2016)',
    genre: 'Thriller',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTg4NDA1OTA5NF5BMl5BanBnXkFtZTgwMDQ2MDM5ODE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt2582782'
  },
  {
    _id: '333333333333333333333325',
    title: 'Nightcrawler (2014)',
    genre: 'Thriller',
    poster: 'https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt2872718'
  },
  {
    _id: '333333333333333333333326',
    title: 'Blackfish (2013)',
    genre: 'Documentary',
    poster: 'https://m.media-amazon.com/images/M/MV5BNTkyNTkwMzkxMl5BMl5BanBnXkFtZTcwMzAwOTE2OQ@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt2545118'
  },
  {
    _id: '333333333333333333333327',
    title: 'Inside Job (2010)',
    genre: 'Documentary',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQ3MjkyODA2Nl5BMl5BanBnXkFtZTcwNzQxMTU4Mw@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt1645089'
  },
  {
    _id: '333333333333333333333328',
    title: 'Deliver Us From Evil (2006)',
    genre: 'Documentary',
    poster: 'https://m.media-amazon.com/images/M/MV5BYWVlM2Y2NDUtOTYyMi00ZDY2LTkyZDAtZGRkM2FhNmNjM2EyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0814075'
  },
  {
    _id: '333333333333333333333329',
    title: 'Hoop Dreams (1994)',
    genre: 'Documentary',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTM4NTU3MDYzNl5BMl5BanBnXkFtZTYwMjYxNDY2._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0110057'
  },
  {
    _id: '333333333333333333333330',
    title: 'Super Size Me (2004)',
    genre: 'Documentary',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTYyOTk4MjIxOF5BMl5BanBnXkFtZTcwMzk1NTUyMQ@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0390521'
  },
  {
    _id: '333333333333333333333331',
    title: 'E.T. The Extra Terrestrial (1982)',
    genre: 'SciFi & Fantasy',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQ2ODFlMDAtNzdhOC00ZDYzLWE3YTMtNDU4ZGFmZmJmYTczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0083866'
  },
  {
    _id: '333333333333333333333332',
    title: 'Gravity (2013)',
    genre: 'SciFi & Fantasy',
    poster: 'https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt1454468'
  },
  {
    _id: '333333333333333333333333',
    title: 'Interstellar (2014)',
    genre: 'SciFi & Fantasy',
    poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0816692'
  },
  {
    _id: '333333333333333333333334',
    title: 'Harry Potter and the Sorcerer\'s Stone (2001)',
    genre: 'SciFi & Fantasy',
    poster: 'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0241527'
  },
  {
    _id: '333333333333333333333335',
    title: 'Frankenstein (1931)',
    genre: 'SciFi & Fantasy',
    poster: 'https://m.media-amazon.com/images/M/MV5BM2RiNjU2MTktZmY1MC00ZGUxLThkNGEtMGUwMWQwMjIyMWNjL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0021884'
  },
  {
    _id: '333333333333333333333336',
    title: 'Up (2009)',
    genre: 'Children & Family',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt1049413'
  },
  {
    _id: '333333333333333333333337',
    title: 'Inside Out (2015)',
    genre: 'Children & Family',
    poster: 'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt2096673'
  },
  {
    _id: '333333333333333333333338',
    title: 'The Jungle Book (2016)',
    genre: 'Children & Family',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTc3NTUzNTI4MV5BMl5BanBnXkFtZTgwNjU0NjU5NzE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt3040964' 
  },
  {
    _id: '333333333333333333333339',
    title: 'Finding Nemo (2003)',
    genre: 'Children & Family',
    poster: 'https://m.media-amazon.com/images/M/MV5BZjMxYzBiNjUtZDliNC00MDAyLTg3N2QtOWNjNmNhZGQzNDg5XkEyXkFqcGdeQXVyNjE2MjQwNjc@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0266543' 
  },
  {
    _id: '333333333333333333333340',
    title: 'Snow White and the Seven Dwarfs (1937)',
    genre: 'Children & Family',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTQwMzE2Mzc4M15BMl5BanBnXkFtZTcwMTE4NTc1Nw@@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0029583'
  },
  {
    _id: '333333333333333333333341',
    title: 'Seven Samurai (1956)',
    genre: 'International',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTRjZTc3NjItMDJiMC00MTNmLTlkYjEtN2ZiZWU4YmI1OGI4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0047478'
  },
  {
    _id: '333333333333333333333342',
    title: 'Army of Shadows (1969)',
    genre: 'International',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTk5MTUyNTA2Nl5BMl5BanBnXkFtZTgwNTQzMDg1NjE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0064040'
  },
  {
    _id: '333333333333333333333343',
    title: 'Rashomon (1951)',
    genre: 'International',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTk1MDU5MjQ5NF5BMl5BanBnXkFtZTgwMDM2OTE4MzE@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0042876'
  },
  {
    _id: '333333333333333333333344',
    title: 'Nosferatu, a Symphony of Horror (1922)',
    genre: 'International',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTAxYjEyMTctZTg3Ni00MGZmLWIxMmMtOGM2NTFiY2U3MmExXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0013442'
  },
  {
    _id: '333333333333333333333345',
    title: 'The Wages of Fear (1953)',
    genre: 'International',
    poster: 'https://m.media-amazon.com/images/M/MV5BZDdkNzMwZmUtY2Q5MS00ZmM2LWJhYjItYTBjMWY0MGM4MDRjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
		users: [],
		imdbID: 'tt0046268' 
  }
];

module.exports = { users, movies, conversations };
