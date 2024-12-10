import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import MoviesList from './MoviesList'
import NewMovieForm from './NewMovieForm'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>
            Home
          </Link>
          <Link to="/add-movie">Add a new movie to the list</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/add-movie" element={<NewMovieForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
