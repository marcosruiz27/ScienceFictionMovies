import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Movie {
  id: number
  name: string
  description: string
  release_year: number
  director: string
  duration: number
}

/**
 * Fetch all movies from the API.
 */
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    console.log('Fetching movies...')
    const response = await fetch('/api/movies')

    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to fetch movies, status code: ${response.status}`)
    }

    const data: Movie[] = await response.json()
    console.log('Movies data:', data)
    return data
  } catch (error) {
    console.error('Error fetching movies:', error)
    return [] // Return an empty array if fetch fails
  }
}

/**
 * Custom hook to fetch movies using useQuery
 */
export const useFetchMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  })
}

/**
 * Function to add a movie to the database
 */
export const addMovie = async (newMovie: Omit<Movie, 'id'>): Promise<Movie> => {
  console.log('Adding movie:', newMovie)

  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to add movie, status code: ${response.status}`)
    }

    const addedMovie: Movie = await response.json()
    console.log('Added movie:', addedMovie)
    return addedMovie
  } catch (error) {
    console.error('Error adding movie:', error)
    throw error
  }
}

/**
 * Function to delete a movie from the database
 */
export const deleteMovie = async (id: number): Promise<void> => {
  console.log('Deleting movie with ID:', id)

  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'DELETE',
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to delete movie, status code: ${response.status}`)
    }

    console.log('Movie deleted successfully')
  } catch (error) {
    console.error('Error deleting movie:', error)
    throw error
  }
}

/**
 * Function to update a movie in the database
 */
export const updateMovie = async (
  id: number,
  updatedData: Partial<Movie>,
): Promise<Movie> => {
  console.log('Updating movie with ID:', id, 'Updated data:', updatedData)

  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to update movie, status code: ${response.status}`)
    }

    const updatedMovie: Movie = await response.json()
    console.log('Updated movie:', updatedMovie)
    return updatedMovie
  } catch (error) {
    console.error('Error updating movie:', error)
    throw error
  }
}

/**
 * Custom hook to add a movie using useMutation
 */
export const useAddMovie = () => {
  const queryClient = useQueryClient()

  return useMutation<Movie, Error, Omit<Movie, 'id'>>({
    mutationFn: addMovie,
    onSuccess: (newMovie) => {
      queryClient.invalidateQueries(['movies'])
    },
    onError: (error) => {
      console.error('Error adding movie:', error)
    },
  })
}

/**
 * Custom hook to delete a movie using useMutation
 */
export const useDeleteMovie = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries(['movies'])
    },
    onError: (error) => {
      console.error('Error deleting movie:', error)
    },
  })
}

/**
 * Custom hook to update a movie using useMutation
 */
export const useUpdateMovie = () => {
  const queryClient = useQueryClient()

  return useMutation<Movie, Error, { id: number; updatedData: Partial<Movie> }>(
    {
      mutationFn: ({ id, updatedData }) => updateMovie(id, updatedData),
      onSuccess: () => {
        queryClient.invalidateQueries(['movies'])
      },
      onError: (error) => {
        console.error('Error updating movie:', error)
      },
    },
  )
}

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const response = await fetch(`/api/movies/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch movie')
  }
  return response.json()
}
