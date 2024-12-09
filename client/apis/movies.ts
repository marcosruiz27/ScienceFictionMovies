/**
 * Fetch all movies from the API.
 */
export const fetchMovies = async () => {
  try {
    console.log('Fetching movies...')
    const response = await fetch('http://localhost:3000/api/movies')
    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to fetch movies, status code: ${response.status}`)
    }

    const data = await response.json()
    console.log('Movies data:', data)
    return data
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}
