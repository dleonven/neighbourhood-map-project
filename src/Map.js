import React, { Component } from 'react';
//import ListViewDemo from './ListView.js'
import ReactDOM from 'react-dom'
import ListView from './ListView.js'



class Map extends Component {

  state = {
      displayedLocations: [
        { name: "Home", location: {lat: -33.889663, lng: 151.273881} },
        { name: "Outdoor Gym", location: {lat: -33.890111, lng: 151.280402} },
        { name: "Metro Supermarket", location: {lat: -33.889149, lng: 151.275638} },
      ]
    }

  componentDidMount() {
      this.loadMap(); // call loadMap function to load the google map
    }

    loadMap() {
        if (this.props && this.props.google) { // checks to make sure that props have been passed
          const {google} = this.props; // sets props equal to google
          const maps = google.maps; // sets maps to google maps props

          const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
          const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

          const mapConfig = Object.assign({}, {
            center: {lat: -33.889663, lng: 151.273881}, // sets center of google map to NYC.
            zoom: 15, // sets zoom. Lower numbers are zoomed further out.
            mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
          })

          this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.


          // ==================
            // ADD MARKERS TO MAP
            // ==================
                this.state.displayedLocations.forEach( location => { // iterate through locations saved in state
                  const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
                    position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
                    map: this.map, // sets markers to appear on the map we just created on line 35
                    title: location.name, // the title of the marker is set to the name of the location
                  });
                })
              }
          }


  render() {


    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '100vw', // 90vw basically means take up 90% of the width screen. px also works.
      height: '100vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
    }

    return (
      <div>
        <div ref="map" style={style}>
          loading map...
        </div>
        <div>
          <ListView displayedLocations={this.state.displayedLocations}/>
        </div>
      </div>


    );
  }
}

export default Map;
