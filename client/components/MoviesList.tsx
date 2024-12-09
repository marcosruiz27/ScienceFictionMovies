import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../apis/movies'

interface Movie {
  id: number
  name: string
  description: string
  release_year: number
  director: string
  duration: number
}

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchMovies()
      console.log('Movies data in component:', moviesData) // Log movies data to confirm
      setMovies(moviesData)
      setLoading(false)
    }

    getMovies()
  }, [])

  if (loading) {
    return <p>Loading movies...</p>
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Science Fiction Movies</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {movies.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '20px' }}>
            <h2>
              {movie.name} ({movie.release_year})
            </h2>
            <p>
              <strong>Description:</strong> {movie.description}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration} minutes
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesList
