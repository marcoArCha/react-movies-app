import React from "react";
import { useState, useEffect } from "react";

import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";


const API_URL = 'http://www.omdbapi.com?apikey=92aaafd8';

const movie1 = {
    "Title": "Superman Returns",
    "Year": "2006",
    "imdbID": "tt0348150",
    "Type": "movie",
    "Poster":"N/A"
    //"Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg"
}

const App = () =>{
    const[movies, setMovies] = useState([]);
    const[searchTerm, setSerchTerm] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect( () => { //useEffect es para que algo ocurra cuando
    // el componente se renderiza por primera vez.
        searchMovies("Superman");
    }, []); //El array vacio es para que solo se ejecute una vez.

    return(

        <div className="app">
            <h1>Mi primer React App de movies</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSerchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                    ? (
                        <div className="container">
                            {
                                movies.map((movie) => (
                                <MovieCard movie={movie}/>
                            ))}
                        </div>

                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>

                    )


            }

        </div>

    );
}

export default App;