import React, { Component } from 'react';
import Map from './Map.js'
import './styles.css';

class App extends Component {
  state = {
    google: {}
  }

componentWillMount() {

  //Load the script to load the map and handle loading error
  var newScript = document.createElement("script");
  newScript.onerror = () => {
    alert("There was a problem displaying the map")
  }
  newScript.onload = () => {
    this.setState({google: window.google})
  }
  newScript.defer = true
  newScript.async = true
  document.currentScript.parentNode.insertBefore(newScript, document.body.nextSibling);
  newScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgaeRT4AeIOkYMjFqUqMqXQMtczkvel44&v=3";
}

  render() {
    return (
      <div>
        <div className="App">
        {/*If the state google object is not empty*/}
        {Object.keys(this.state.google).length > 0 &&
          <Map google={this.state.google}/>
        }
        </div>
      </div>
    );
  }
}

export default App;
