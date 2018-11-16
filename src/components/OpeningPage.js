import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class OpeningPage extends Component {
  render() {

    return (
      <div className='opening'>
      
      <audio controls autoPlay>
          <source src='./101 - opening.mp3'  type='audio/mpeg' />
      </audio>
      
          <h1>Pokemon Battle Game</h1>
          <Link to='/battlefield'><button type='button' className='startbutton'>START</button></Link>
      </div>
    )
  }
}
