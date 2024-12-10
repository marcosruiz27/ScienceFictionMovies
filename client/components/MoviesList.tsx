import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMovies, deleteMovie } from '../apis/movies'

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
  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies()
        console.log('Movies data in component:', moviesData)
        setMovies(moviesData)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    getMovies()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteMovie(id)
      // Remove the deleted movie from the state
      setMovies(movies.filter((movie) => movie.id !== id))
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  const handleEdit = (id: number) => {
    // Redirect to the edit movie page
    navigate(`/edit-movie/${id}`)
  }

  if (loading) {
    return <p>Loading movies...</p>
  }

  return (
    <div className="movie-list-container">
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
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
            <div className="movie-actions">
              <button
                onClick={() => handleDelete(movie.id)}
                className="delete-btn"
              >
                Delete
              </button>
              <button onClick={() => handleEdit(movie.id)} className="edit-btn">
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MoviesList
