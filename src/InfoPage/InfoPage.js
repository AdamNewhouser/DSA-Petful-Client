import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage.css';

class InfoPage extends Component {
  render() {
    return (
      <div className='site-details'>
        <img src="https://wallpaperaccess.com/full/497384.jpg" alt='cat and dog picture' />
        <h2>Welcome to Petful</h2>
        <p>Petful is an easy to use 
          pet adoption site. We have dogs and cats available for adoption. We have a 'First In First Out' policy here at Petful. This means that we only have one dog and 
          one cat available to adopt at a time. Only the cat and dog that have been at our shelter
          the longest are available for adoption.
        </p>
        <p>Please get in line to adopt a pet. When you are the first in 
          line you will be given the option to adopt our available dog, our available cat, or both. You will have
          thirty seconds to decide if you would like to adopt before being moved to the back of the line again.
        </p>
        <Link to='/Adoptions'><button className='enter-site-button'>Proceed to Site</button></Link>
      </div>
    )
  }
}

export default InfoPage;