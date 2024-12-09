import React from 'react'
import { useFetchMovies } from '../apis/movies'

const App: React.FC = () => {
  const { data, error, isLoading, isError } = useFetchMovies()

  if (isLoading) {
    return <p>Loading movies...</p>
  }

  if (isError) {
    return <p>Error fetching movies: {error?.message}</p>
  }

  return (
    <div>
      <h1>Science Fiction Movies</h1>
      <ul>
        {data?.map((movie) => (
          <li key={movie.id} style={{ marginBottom: '20px' }}>
            <h2>{movie.name}</h2>
            <p>
              <strong>Release Year:</strong> {movie.release_year}
            </p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Plot:</strong> {movie.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
