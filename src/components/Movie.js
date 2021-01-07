import React from 'react'
import Grid from './elements/Grid'
import MovieInfo from './elements/MovieInfo'
import MovieInfoBar from './elements/MovieInfoBar'
import Spinner from './elements/Spinner'
import Navigation from './elements/Navigation'
import Actor from "./elements/Actor";
import { useMovieFetch } from './Hooks/useMovieFetch'


const Movie = ({ movieId }) => {

    const [movie, loading, error] = useMovieFetch(movieId);
    console.log('**********movie*****', movie);
    if (error) return <div>Something went wrong ...</div>;
    if (loading) return <Spinner />;

    return (
        <>
            <Navigation movie={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Grid header="Actors">
                {movie.actors.map(actor => (
                    <Actor key={actor.credit_id} actor={actor} />
                ))}
            </Grid>
        </>
    )
}

export default Movie;