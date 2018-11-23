import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import openingMusic from '../styles/Music/101 - opening.mp3'

export default class OpeningPage extends Component {
  render() {

    return (
      <div className='opening'>
        <audio controls autoPlay loop>
            <source src={openingMusic}  type='audio/mpeg' />
        </audio>
        <div className="opening-title">
          <h1><span className='opening-title__header'>Pokemon</span> Battle Game</h1>
          <Link to='/battle'><button type='button' className='startbutton'>START</button></Link>
        </div>
      </div>
    )
  }
}
