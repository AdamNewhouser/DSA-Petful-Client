import React, { Component } from 'react';

class SuccessInfo extends Component {
  render(){
    return(
      <div>
        <img src={this.props.animal.imageURL} alt={this.props.animal.imageDescription}/>
        <p className='adoption-details'>{this.props.animal.animalName} was adopted by {this.props.animal.humanName}</p>
      </div>
    )
  }
}

export default SuccessInfo;