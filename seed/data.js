//HASH FOR PASSWORD123

const users = [
	{
		username: "test1",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test1@gmail.com"
	},
	{
		username: "test2",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test2@gmail.com"
	},
	{
		username: "test3",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test3@gmail.com"
	},
	{
		username: "test4",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test4@gmail.com"
	},
	{
		username: "test5",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test5@gmail.com"
	},
	{
		username: "test6",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test6@gmail.com"
	},
	{
		username: "test7",
		password: "$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq",
		email: "test7@gmail.com"
	}
];

const movies = [
	{
		title: "Get Out",
		genre: "Horror",
		poster: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Exorcist",
		genre: "Horror",
		poster: "https://m.media-amazon.com/images/M/MV5BYjhmMGMxZDYtMTkyNy00YWVmLTgyYmUtYTU3ZjcwNTBjN2I1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Rosemary's Baby",
		genre: "Horror",
		poster: "https://m.media-amazon.com/images/M/MV5BMjE3NzE4NzkyNl5BMl5BanBnXkFtZTgwNTYyODgwNzE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Pan's Labyrinth",
		genre: "Horror",
		poster: "https://m.media-amazon.com/images/M/MV5BMTU3ODg2NjQ5NF5BMl5BanBnXkFtZTcwMDEwODgzMQ@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Silence of the Lambs",
		genre: "Horror",
		poster: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Star Wars: Episode VII - The Force Awakens",
		genre: "Action & Adventure",
		poster: "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Mad Max: Fury Road",
		genre: "Action & Adventure",
		poster: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Baby Driver",
		genre: "Action & Adventure",
		poster: "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Dark Knight",
		genre: "Action & Adventure",
		poster: "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Jaws",
		genre: "Action & Adventure",
		poster: "https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Philadelphia Story",
		genre: "Comedy",
		poster: "https://m.media-amazon.com/images/M/MV5BYjQ4ZDA4NGMtMTkwYi00NThiLThhZDUtZTEzNTAxOWYyY2E4XkEyXkFqcGdeQXVyMjUxODE0MDY@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Monty Python and the Holy Grail",
		genre: "Comedy",
		poster: "https://m.media-amazon.com/images/M/MV5BN2IyNTE4YzUtZWU0Mi00MGIwLTgyMmQtMzQ4YzQxYWNlYWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Back to the Future (1985)",
		genre: "Comedy",
		poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Modern Times (1936)",
		genre: "Comedy",
		poster: "https://m.media-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Hangover",
		genre: "Comedy",
		poster: "https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Moonlight (2016)",
		genre: "Drama",
		poster: "https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Casablanca (1942)",
		genre: "Drama",
		poster: "https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Godfather (1972)",
		genre: "Drama",
		poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Argo (2012)",
		genre: "Drama",
		poster: "https://m.media-amazon.com/images/M/MV5BNzljNjY3MDYtYzc0Ni00YjU0LWIyNDUtNTE0ZDRiMGExMjZlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Citizen Kane (1941)",
		genre: "Drama",
		poster: "https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Psycho (1960)",
		genre: "Thriller",
		poster: "https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Taken",
		genre: "Thriller",
		poster: "https://m.media-amazon.com/images/M/MV5BMTM4NzQ0OTYyOF5BMl5BanBnXkFtZTcwMDkyNjQyMg@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "A Quiet Place",
		genre: "Thriller",
		poster: "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Hell or High Water (2016)",
		genre: "Thriller",
		poster: "https://m.media-amazon.com/images/M/MV5BMTg4NDA1OTA5NF5BMl5BanBnXkFtZTgwMDQ2MDM5ODE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Nightcrawler (2014)",
		genre: "Thriller",
		poster: "https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Blackfish (2013)",
		genre: "Documentary",
		poster: "https://m.media-amazon.com/images/M/MV5BNTkyNTkwMzkxMl5BMl5BanBnXkFtZTcwMzAwOTE2OQ@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Inside Job (2010)",
		genre: "Documentary",
		poster: "https://m.media-amazon.com/images/M/MV5BMTQ3MjkyODA2Nl5BMl5BanBnXkFtZTcwNzQxMTU4Mw@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Deliver Us From Evil (2006)",
		genre: "Documentary",
		poster: "https://m.media-amazon.com/images/M/MV5BYWVlM2Y2NDUtOTYyMi00ZDY2LTkyZDAtZGRkM2FhNmNjM2EyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Hoop Dreams (1994)",
		genre: "Documentary",
		poster: "https://m.media-amazon.com/images/M/MV5BMTM4NTU3MDYzNl5BMl5BanBnXkFtZTYwMjYxNDY2._V1_SX300.jpg",
		users: []
	},
	{
		title: "Supersize Me (2004)",
		genre: "Documentary",
		poster: "https://m.media-amazon.com/images/M/MV5BMTYyOTk4MjIxOF5BMl5BanBnXkFtZTcwMzk1NTUyMQ@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "E.T. The Extra Terrestrial (1982)",
		genre: "SciFi & Fantasy",
		poster: "https://m.media-amazon.com/images/M/MV5BMTQ2ODFlMDAtNzdhOC00ZDYzLWE3YTMtNDU4ZGFmZmJmYTczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Gravity (2013)",
		genre: "SciFi & Fantasy",
		poster: "https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Interstellar",
		genre: "SciFi & Fantasy",
		poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Harry Potter and the Sorcerer's Stone",
		genre: "SciFi & Fantasy",
		poster: "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Frankenstein (1931)",
		genre: "SciFi & Fantasy",
		poster: "https://m.media-amazon.com/images/M/MV5BM2RiNjU2MTktZmY1MC00ZGUxLThkNGEtMGUwMWQwMjIyMWNjL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Up (2009)",
		genre: "Children & Family",
		poster: "https://m.media-amazon.com/images/M/MV5BMTk3NDE2NzI4NF5BMl5BanBnXkFtZTgwNzE1MzEyMTE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Inside Out (2015)",
		genre: "Children & Family",
		poster: "https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Jungle Book (2016)",
		genre: "Children & Family",
		poster: "https://m.media-amazon.com/images/M/MV5BMTc3NTUzNTI4MV5BMl5BanBnXkFtZTgwNjU0NjU5NzE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Finding Nemo (2003)",
		genre: "Children & Family",
		poster: "https://m.media-amazon.com/images/M/MV5BZjMxYzBiNjUtZDliNC00MDAyLTg3N2QtOWNjNmNhZGQzNDg5XkEyXkFqcGdeQXVyNjE2MjQwNjc@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Snow White and the Seven Dwarfs (1937)",
		genre: "Children & Family",
		poster: "https://m.media-amazon.com/images/M/MV5BMTQwMzE2Mzc4M15BMl5BanBnXkFtZTcwMTE4NTc1Nw@@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Seven Samurai (1956)",
		genre: "International",
		poster: "https://m.media-amazon.com/images/M/MV5BMTRjZTc3NjItMDJiMC00MTNmLTlkYjEtN2ZiZWU4YmI1OGI4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Army of Shadows (1969)",
		genre: "International",
		poster: "https://m.media-amazon.com/images/M/MV5BMTk5MTUyNTA2Nl5BMl5BanBnXkFtZTgwNTQzMDg1NjE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Rashomon (1951)",
		genre: "International",
		poster: "https://m.media-amazon.com/images/M/MV5BMTk1MDU5MjQ5NF5BMl5BanBnXkFtZTgwMDM2OTE4MzE@._V1_SX300.jpg",
		users: []
	},
	{
		title: "Nosferatu, a Symphony of Horror (1922)",
		genre: "International",
		poster: "https://m.media-amazon.com/images/M/MV5BMTAxYjEyMTctZTg3Ni00MGZmLWIxMmMtOGM2NTFiY2U3MmExXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
		users: []
	},
	{
		title: "The Wages of Fear (1953)",
		genre: "International",
		poster: "https://m.media-amazon.com/images/M/MV5BZDdkNzMwZmUtY2Q5MS00ZmM2LWJhYjItYTBjMWY0MGM4MDRjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
		users: []
	}
];

module.exports = { users, movies };
