import * as Path from 'node:path'
import express from 'express'
import moviesRoutes from './routes/movies'
import cors from 'cors'

const server = express()

// Enable CORS if frontend and backend are on different ports
server.use(cors())

server.use(express.json())

// Use the moviesRoutes for /api/movies endpoint
server.use('/api/movies', moviesRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
