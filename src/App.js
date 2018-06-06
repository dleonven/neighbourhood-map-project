import React, { Component } from 'react';
import Map from './Map.js'
import './styles.css';

// import the Google Maps API Wrapper from google-maps-react
import { GoogleApiWrapper } from 'google-maps-react'

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Map google={this.props.google}/>
        </div>
      </div>
    );
  }
}

// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgaeRT4AeIOkYMjFqUqMqXQMtczkvel44&v=3',
})(App)
