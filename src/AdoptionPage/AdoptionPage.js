import React, { Component } from 'react';
import './AdoptionPage.css';

class AdoptionPage extends Component {
  state = {
    currentCat: null,
    currentDog: null,
    users: null,
    usersList: null,
    userName: null || window.localStorage.petful_user_name,
    createUserInterval: null,
  }

  createUserList = () => {
    let usersListUpdate = [];
    let currUser = this.state.users
    while(currUser) {
      usersListUpdate.push(currUser.value)
      currUser = currUser.next;
    }
    this.setState({
      usersList: usersListUpdate
    })
    return usersListUpdate;
  }

  componentDidMount() {
    this.createUserList()
    this.setState({
      currentCat: this.props.petsData.firstCat,
      currentDog: this.props.petsData.firstDog,
      users: this.props.petsData.users
    })
    let createUserInterval = setInterval(this.createUserList, 1000)
    this.setState({
      createUserInterval
    })
  }

  static getDerivedStateFromProps = (props, state) => {
    let usersListUpdate = [];
    if(state.users) {
      let currUser = state.users
      while(currUser.next) {
        usersListUpdate.push(currUser.value)
        currUser = currUser.next;
      }
    }
    
    return {
      currentCat: props.petsData.firstCat,
      currentDog: props.petsData.firstDog,
      users: props.petsData.users,
      usersList: usersListUpdate
    }
  }

  handleJoin = (e) => {
    e.preventDefault();
    let user = e.target.user.value;
    window.localStorage.setItem('petful_user_name', user)
    this.setState({
      userName: user,
    })
  
    this.setState({
      users: this.props.joinQueue(user)
    })
    this.createUserList();
    this.createVisualList();
  }

  createVisualList = () => {
    let firstList = this.props.petsData.users;
    let testUserList = [];
    while(firstList) {
      testUserList.push(firstList.value);
      firstList = firstList.next;
    }
    if(testUserList[0] === undefined) return <p>Updating List</p>
    if(testUserList[0] !== undefined) {
        return testUserList.map((value, index) => { 
        return <li key={index}>{value}</li>
      })
    }
    
  }

  handleAdoptCatButton = (e) => {
    e.preventDefault();
    this.setState({
      userName: null
    })
    this.props.adoptCat();
  }

  handleAdoptDogButton = (e) => {
    e.preventDefault();
    this.setState({
      userName: null
    })
    this.props.adoptDog();
  }

  handleAdoptBothButton = (e) => {
    e.preventDefault();
    this.setState({
      userName: null
    })
    this.props.adoptBoth();
  }

  componentWillUnmount() {
    clearInterval(this.state.createUserInterval);
  }

  render() {

    let currentCat = this.state.currentCat ? this.state.currentCat.value : null;
    let currentDog = this.state.currentDog ? this.state.currentDog.value : null
    return (
      <div className='adopt-now-page'>
        <h2>ADOPT NOW</h2>
        <div className='adoption-options'>
        <div>
          <h3>AVAILABLE CAT</h3>
          {!currentCat
          ? <h4>No Cats Available for Adoption</h4>
          : <>
          <img src={this.state.currentCat.value.imageURL} alt={this.state.currentCat.value.imageDescription}/>
          <ul>
            <li><span className='pet-details'>Name:</span> {currentCat.name}</li>
            <li><span className='pet-details'>Age:</span>{currentCat.age}</li>
            <li><span className='pet-details'>Sex:</span> {currentCat.sex}</li>
            <li><span className='pet-details'>Breed:</span> {currentCat.breed}</li>
            <li><span className='pet-details'>Story:</span> {currentCat.story}</li>
          </ul>
          </>
          }
          
        </div>
        <div>
          <h3>AVAILABLE DOG</h3>
          {!currentDog
          ? <h4>Dogs Available for Adoption</h4>
          : <>
          <img src={this.state.currentDog.value.imageURL} alt={this.state.currentDog.value.imageDescription}/>
          <ul>
            <li><span className='pet-details'>Name:</span> {currentDog.name}</li>
            <li><span className='pet-details'>Age:</span>{currentDog.age}</li>
            <li><span className='pet-details'>Sex:</span> {currentDog.sex}</li>
            <li><span className='pet-details'>Breed:</span> {currentDog.breed}</li>
            <li><span className='pet-details'>Story:</span> {currentDog.story}</li>
          </ul>
          
          </>
          }

        </div>
        </div>
        
      <h2>Queue</h2>
        {this.state.userName ?
        <></> :
        <form onSubmit={(e) => this.handleJoin(e)}>
          <div>
            <label htmlFor='user'>Name:</label>
            <input type='text' name='user' required></input>
          </div>
          <button className='join-queue-button' type='submit'>Get In Line</button>
        </form>}

        {this.state.users && this.state.users.value !== this.state.userName ?
            <></>
          : <div className= 'adopt-buttons'>
              <button onClick={(e) => this.handleAdoptCatButton(e)}>Adopt Cat</button>
              <button onClick={(e) => this.handleAdoptDogButton(e)}>Adopt Dog</button>
              <button onClick={(e) => this.handleAdoptBothButton(e)}>Adopt Both</button>
            </div>
      
        }
       
        {this.props.petsData.users &&
          <ol>
            {this.createVisualList()}
          </ol>}
      </div>
    )
  }
}

export default AdoptionPage;