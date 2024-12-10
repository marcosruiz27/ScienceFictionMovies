import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MoviesList from './MoviesList'
import NewMovieForm from './NewMovieForm'
import EditMovieForm from './EditMovieForm'
import '../styles/styles.css'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Science Fiction Movies</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add-movie">Add a Movie to the List</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/add-movie" element={<NewMovieForm />} />
          <Route path="/edit-movie/:id" element={<EditMovieForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
