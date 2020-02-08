import React, { Component } from 'react';
import SuccessInfo from './SuccessInfo';
import './SuccessPage.css';
class SuccessPage extends Component {
  state = {
    successes: null,
  }

  setSuccesses = () => {
    this.setState({
      successes: this.props.successes
    })
  }

  componentDidMount() {
    this.setSuccesses();
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      successes: props.successes
    }
  }

  renderSuccesses = () => {
    return this.state.successes.map((animal, index) => {
      return <SuccessInfo key = {index} animal={animal}/>
    })
  }

  render() {
    return (
      <div className='success-page'>
        <h2>SUCCESS STORIES</h2>
        <div className='adopted-info'>
          {this.state.successes && this.renderSuccesses()}
        </div>
      </div>
    )
  }
}

export default SuccessPage;