import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addMovie, deleteMovie, updateMovie, Movie } from '../apis/movies'

const NewMovieForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    name: '',
    description: '',
    release_year: 0,
    director: '',
    duration: 0,
  })
  const queryClient = useQueryClient()

  // adding a new movie
  const addMutation = useMutation<Movie, Error, Omit<Movie, 'id'>>({
    mutationFn: addMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(['movies'])
      setFormData({
        name: '',
        description: '',
        release_year: 0,
        director: '',
        duration: 0,
      })
    },
    onError: (error) => {
      console.error('Error adding movie:', error)
    },
  })

  // deleting a movie
  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(['movies'])
    },
    onError: (error) => {
      console.error('Error deleting movie:', error)
    },
  })

  // updating a movie
  const updateMutation = useMutation<
    Movie,
    Error,
    { id: number; data: Omit<Movie, 'id'> }
  >({
    mutationFn: ({ id, data }) => updateMovie(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['movies'])
    },
    onError: (error) => {
      console.error('Error updating movie:', error)
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'release_year' || name === 'duration' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate(formData)
  }

  // Handle delete and update for specific movies
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  const handleUpdate = (id: number) => {
    updateMutation.mutate({ id, data: formData })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Movie</h2>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Release Year:
            <input
              type="number"
              name="release_year"
              value={formData.release_year || ''}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Director:
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Duration (minutes):
            <input
              type="number"
              name="duration"
              value={formData.duration || ''}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={addMutation.isLoading}>
          {addMutation.isLoading ? 'Adding...' : 'Add Movie'}
        </button>
      </form>

      <div>
        <h3>Movies</h3>
        <ul>
          <li>
            Movie Name
            <button onClick={() => handleDelete(1)}>Delete</button>
            <button onClick={() => handleUpdate(1)}>Update</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NewMovieForm
