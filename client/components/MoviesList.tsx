import React, { useEffect, useState } from 'react'
import { fetchMovies, deleteMovie, updateMovie } from '../apis/movies'

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
  const [editMovieId, setEditMovieId] = useState<number | null>(null)
  const [updatedMovie, setUpdatedMovie] = useState<Partial<Movie>>({
    name: '',
    description: '',
    release_year: 0,
    director: '',
    duration: 0,
  })

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchMovies()
      console.log('Movies data in component:', moviesData)
      setMovies(moviesData)
      setLoading(false)
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

  const handleEdit = (movie: Movie) => {
    setEditMovieId(movie.id)
    setUpdatedMovie({
      name: movie.name,
      description: movie.description,
      release_year: movie.release_year,
      director: movie.director,
      duration: movie.duration,
    })
  }

  const handleUpdate = async () => {
    if (editMovieId && updatedMovie.name) {
      try {
        const updated = await updateMovie(editMovieId, updatedMovie)
        // Update the movie in the state
        setMovies(
          movies.map((movie) =>
            movie.id === editMovieId ? { ...movie, ...updated } : movie,
          ),
        )
        setEditMovieId(null) // Close the edit form
      } catch (error) {
        console.error('Error updating movie:', error)
      }
    }
  }

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
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
            <button onClick={() => handleEdit(movie)}>Edit</button>
          </li>
        ))}
      </ul>

      {editMovieId && (
        <div>
          <h2>Edit Movie</h2>
          <input
            type="text"
            placeholder="Movie Name"
            value={updatedMovie.name}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, name: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={updatedMovie.description}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Release Year"
            value={updatedMovie.release_year}
            onChange={(e) =>
              setUpdatedMovie({
                ...updatedMovie,
                release_year: +e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Director"
            value={updatedMovie.director}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, director: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={updatedMovie.duration}
            onChange={(e) =>
              setUpdatedMovie({ ...updatedMovie, duration: +e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update Movie</button>
          <button onClick={() => setEditMovieId(null)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

export default MoviesList
