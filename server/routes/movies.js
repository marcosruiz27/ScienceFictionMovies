import express from 'express'
import knexLib from 'knex'
import knexConfig from '../db/knexfile'
import connection from '../db/connection'

const knex = connection
const router = express.Router()

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await knex('movies').select('*')
    res.status(200).json(movies)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Error fetching movies from the database.' })
  }
})

// GET a single movie by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const movie = await knex('movies').where({ id }).first()
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' })
    }
    res.status(200).json(movie)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Error fetching the movie from the database.' })
  }
})

// POST a new movie
router.post('/', async (req, res) => {
  const { name, description, release_year, director, duration } = req.body

  // Validation for required fields
  if (!name || !description || !release_year || !director || !duration) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Insert the new movie into the 'movies' table
    const [newMovie] = await knex('movies')
      .insert({
        name,
        description,
        release_year,
        director,
        duration,
      })
      .returning('*') // Return the newly created movie with the inserted data

    // Send the new movie as a response
    res.status(201).json(newMovie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error adding the movie to the database.' })
  }
})

// DELETE a movie by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deletedMovie = await knex('movies').where({ id }).del()
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found.' })
    }
    res.status(200).json({ message: 'Movie deleted successfully.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting the movie.' })
  }
})

// UPDATE a movie by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updatedMovieData = req.body

  try {
    const updatedMovie = await knex('movies')
      .where({ id })
      .update(updatedMovieData)
      .returning('*')

    if (!updatedMovie.length) {
      return res.status(404).json({ message: 'Movie not found.' })
    }

    res.status(200).json(updatedMovie[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating the movie.' })
  }
})

export default router
