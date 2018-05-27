import React, { Component } from 'react';
//import ListViewDemo from './ListView.js'
import ReactDOM from 'react-dom'
import ListView from './ListView.js'

const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
  width: '100vw', // 90vw basically means take up 90% of the width screen. px also works.
  height: '100vh' // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
}



class Map extends Component {


  state = {
      locations: [
        { name: "Home", location: {lat: -33.889663, lng: 151.273881} },
        { name: "Outdoor Gym", location: {lat: -33.890111, lng: 151.280402} },
        { name: "Metro Supermarket", location: {lat: -33.889149, lng: 151.275638} },
      ],

      markers: [],
      infoWindow: []
    }

  componentDidMount() {
    // call loadMap function to load the google map
    this.loadMap();
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

          // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
          this.map = new maps.Map(node, mapConfig);



          // ==================
          // ADD MARKERS TO MAP
          // ==================
          let markers = []
          let infoWindow = new google.maps.InfoWindow()
          this.setState({ infoWindow: infoWindow })

          this.state.locations.forEach( location => { // iterate through locations saved in state
            const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
              position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
              map: this.map, // sets markers to appear on the map we just created on line 35
              title: location.name, // the title of the marker is set to the name of the location
            });

            /*when a marker is clicked, then call the function to populate
            the infowindow (arrow function used so to not have problems with
            the 'this' scope)*/
            marker.addListener('click', () => {
              this.populateInfoWindow(marker, infoWindow)
            });

            markers.push(marker)

          })

          this.setState({ markers: markers })

        }
  }


  /*I based myself on the Udacity classes logic to populate the infowindow*/
  populateInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if(infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
      });
    }
  }


  render() {

    return (
      <div>
        <div ref="map" style={style}>
          loading map...
        </div>
        <div>
          <ListView
            locations={this.state.locations}
            populateInfoWindow={this.populateInfoWindow}
            infoWindow={this.state.infoWindow}
            markers={this.state.markers}
            map={this.map}
          />
        </div>
      </div>


    );
  }
}

export default Map;
