import express from 'express'
import knexLib from 'knex'
import knexConfig from '../db/knexfile'

const knex = knexLib(knexConfig.development) // Initialize knex with development config
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

export default router
