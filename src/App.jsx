import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Quiz App</h1>
        <nav className="nav">
          <NavLink to="/quiz" className="link">Quiz</NavLink>
          <NavLink to="/results" className="link">Results</NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">Built with React + Vite</footer>
    </div>
  )
}
