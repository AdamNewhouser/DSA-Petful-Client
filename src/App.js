import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import AdoptionPage from './AdoptionPage/AdoptionPage';
import InfoPage from './InfoPage/InfoPage';
import SuccessPage from './SuccessPage/SuccessPage';
import PetsPage from './PetsPage/PetsPage';
import config from './config';
import './App.css'

class App extends Component {
  state = {
    firstDog: {},
    firstCat: {},
    users: [],
    successes: []
  }

  setSuccessStories = () => {
    let url = config.API_ENDPOINT
    fetch(url + 'successes', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          successes: data
        })
      })
  }

  setUsers = () => {
    let url = config.API_ENDPOINT
    fetch(url + 'users', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          users: data
        })
      })

  }

  setFirstCat = () => {
    let url = config.API_ENDPOINT
    fetch(url + 'cats', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          firstCat: data
        })
      })
  }

  setFirstDog = () => {
    let url = config.API_ENDPOINT
    fetch(url + 'dogs', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          firstDog: data
        })
      })
  }

  adoptCat = () => {
    window.localStorage.clear()
    let url = config.API_ENDPOINT
    fetch(url + 'cats', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return
    })
    .then(() => {
      this.setState({
        firstCat: this.state.firstCat.next ? this.state.firstCat.next : null,
        users: this.state.users.next ? this.state.users.next : null
      })
    })
  }

  adoptDog = () => {
    window.localStorage.clear()
    let url = config.API_ENDPOINT
    fetch(url + 'dogs', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return
    })
    .then(() => {
      this.setState({
        firstDog: this.state.firstDog.next ? this.state.firstDog.next : null,
        users: this.state.users.next ? this.state.users.next : null
      })
    })
  }

  joinQueue = (user) => {
    let url = config.API_ENDPOINT
    let input = { user }
    fetch(url + 'users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(res => {
      this.setState({
        users: res
      })
      return this.state.users
    })
  }

  adoptBoth = () => {
    window.localStorage.clear()
    let url = config.API_ENDPOINT
    fetch(url + 'users', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return
    })
    .then(() => {
      this.setState({
        firstCat: this.state.firstCat.next ? this.state.firstCat.next : null,
        firstDog: this.state.firstDog.next ? this.state.firstDog.next : null,
        users: this.state.users.next ? this.state.users.next : null
      })
    })
  }

  componentDidMount() {
    this.setFirstCat();
    this.setFirstDog();
    this.setUsers();
    this.setSuccessStories();

    setInterval(this.setUsers, 5000);
    setInterval(this.setFirstCat, 5000);
    setInterval(this.setFirstDog, 5000);
    setInterval(this.setSuccessStories, 5000);
  }

  componentWillUnmount() {
    clearInterval();
  }
  render() {
    return (
      <div>
        <header>
          <Link to='/'><button className='logo-button'><h1>PETFUL</h1></button></Link>
          <nav className='nav-bar'>
            <Link to='Pets'><button className='nav-button'>Pets</button></Link>
            <Link to='/Adoptions'><button className='nav-button'>Adopt Now</button></Link>
            <Link to='/Success'><button className='nav-button'>Success</button></Link>
          </nav>
        </header>
        <Route exact path='/' component={InfoPage} />
        <Route path='/Adoptions' render = {() => {
          return <AdoptionPage 
            petsData={this.state} 
            adoptCat={this.adoptCat}
            adoptDog={this.adoptDog}
            adoptBoth= {this.adoptBoth}
            joinQueue= {this.joinQueue}
          /> 
        }}/>
        <Route path='/Pets' render={() => {
          return <PetsPage petsData={this.state} />
        }} />
        <Route path='/Success' render = {() => {
          return <SuccessPage successes={this.state.successes} />
        }}/>
        {/* <button id='reset-button-test' onClick = {(e) => this.resetData(e)}>RESET SERVER DATA</button> */}
      </div>
    )
  }
}

export default App;