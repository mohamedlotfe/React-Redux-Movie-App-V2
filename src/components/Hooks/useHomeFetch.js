import { useState, useEffect } from 'react'
import {POPULAR_BASE_URL,
    SEARCH_BASE_URL } from "../../config";

export const useHomeFetch = () => {
    const [state, setState] = useState({ movies: [] })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchMovies = async (endpoint) => {
        setError(false)
        setLoading(true)

        let isLoadingMore = endpoint.search('page');

        try {
            const results = await (await fetch(endpoint)).json();

            setState(prev => ({
                ...prev,
                movies:
                    isLoadingMore == -1
                        ? [prev.movies, ...results.results]
                        : [...results.results],
                heroImage: prev.heroImage || results.results[0],
                currentPage: results.page,
                totalPages: results.total_pages
            }))
        } catch (error) {
            setError(true)
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMovies(`${POPULAR_BASE_URL}`)
    }, [])
    return [{ state, loading, error }, fetchMovies];
}
