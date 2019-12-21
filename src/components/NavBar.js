import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
     <nav className="nav">
       <ul className="ul">
         <li className="li"><Link to='/'>Home</Link></li>
         <li><Link to='/about'>About</Link></li>
         <li><Link to='/contact'>Contact</Link></li>
       </ul>
     </nav>
    )
  }
}
