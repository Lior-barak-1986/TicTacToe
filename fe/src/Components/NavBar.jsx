import React from 'react'
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className='navContainer'>
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
    </div>
  )
}
