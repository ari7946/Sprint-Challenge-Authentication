import React, { Component } from 'react';
import '../App.css';
import '../index.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from "axios";
axios.defaults.withCredentials = true

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        Authorization: token
      }
    }
    console.log('requestOptions', localStorage.getItem('token'))
    axios
      .get(`http://localhost:5000/api/jokes`, requestOptions)
      .then(res => {
        this.setState({
          jokes: res.data
        })
      })
      .catch(err => this.props.history.push('/login'))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <h4>Jokes:</h4>
          {this.state.jokes.map(joke =>
            <div key={joke.id}>
              <div className="card-body">
                <p className="small">{joke.type}</p>
                <h5 className="card-title py-0">{joke.setup}</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;