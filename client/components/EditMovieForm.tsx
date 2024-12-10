import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMovieById, updateMovie, Movie } from '../apis/movies'

const EditMovieForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<Omit<Movie, 'id'> | null>(null)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const updateMutation = useMutation<
    Movie,
    Error,
    { id: number; data: Omit<Movie, 'id'> }
  >({
    mutationFn: ({ id, data }) => updateMovie(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['movies'])
      navigate('/') // Redirect to the movies list
    },
    onError: (error) => {
      console.error('Error updating movie:', error)
    },
  })

  useEffect(() => {
    const getMovieData = async () => {
      if (id) {
        const movieData = await fetchMovieById(Number(id))
        setFormData(movieData)
      }
    }
    getMovieData()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev!,
      [name]:
        name === 'release_year' || name === 'duration' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (id && formData) {
      updateMutation.mutate({ id: Number(id), data: formData })
    }
  }

  if (!formData) return <p>Loading movie details...</p>

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={updateMutation.isLoading}>
          {updateMutation.isLoading ? 'Updating...' : 'Update Movie'}
        </button>
      </form>
    </div>
  )
}

export default EditMovieForm
