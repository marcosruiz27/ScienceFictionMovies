import { useQuery } from '@tanstack/react-query'

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
    const response = await fetch('http://localhost:3000/api/movies')
    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to fetch movies, status code: ${response.status}`)
    }

    const data: Movie[] = await response.json()
    console.log('Movies data:', data)
    return data
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

/**
 * Custom hook to fetch movies using useQuery
 */
export const useFetchMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movies'], // Unique key for caching
    queryFn: fetchMovies, // Function to fetch data
  })
}
