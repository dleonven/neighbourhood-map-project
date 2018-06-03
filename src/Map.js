import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListView from './ListView.js';
import './ListView.css';



class Map extends Component {

  state = {
      places: [
        { name: "Namaste Restaurant", location: {lat: -33.889350, lng: 151.270787}, foursquareID: '50c43ab5e4b09f38ad37bf00', marker: {} },
        { name: "Beach Road Hotel", location: {lat: -33.886235, lng: 151.272530}, foursquareID: '4b0a4a43f964a520062323e3', marker: {} },
        { name: "Bondi Junction Station", location: {lat: -33.891039, lng: 151.248469}, foursquareID: '4b08c7ccf964a5202a1223e3', marker: {} },
        { name: "Waverley Library", location: {lat: -33.892960, lng: 151.244995}, foursquareID: '4b78b5d4f964a520e1de2ee3', marker: {} },
        { name: "Bondi Icebergs", location: {lat: -33.894996, lng: 151.274340}, foursquareID: '4b058771f964a5206b9322e3', marker: {} },
      ],

      infowindow: [],

      listViewVisible: false
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
              zoom: 14.3, // sets zoom. Lower numbers are zoomed further out.
              mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
            })

            // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
            this.map = new maps.Map(node, mapConfig);


            // ==================
            // ADD MARKERS TO MAP
            // ==================
            let infowindow = new google.maps.InfoWindow()
            this.setState({ infowindow: infowindow })

            // iterate through places saved in state
            this.state.places.forEach( place => {
              const marker = new google.maps.Marker({ // creates a new Google maps Marker object.
                position: {lat: place.location.lat, lng: place.location.lng}, // sets position of marker to specified location
                map: this.map, // sets markers to appear on the map we just created on line 35
                title: place.name, // the title of the marker is set to the name of the place
                animation: google.maps.Animation.DROP
              });

              /*Asign the new marker object to it's place
              This assigns it in the state (can be accesed globaly)
              */
              place.marker = marker


              /*when a marker is clicked, then call the function to populate
              the infowindow (arrow function used so to not have problems with
              the 'this' scope)*/
              marker.addListener('click', () => {

                this.animateMarker(marker, google)
                this.populateInfowindow(place, infowindow)
              });

            })

          }
    }

    handleToggleList = () => {
      this.setState({ listViewVisible: !this.state.listViewVisible })
    }


  animateMarker = (marker, google) => {

    /*Start bouncing with the click*/
    marker.setAnimation(google.maps.Animation.BOUNCE)

    /*Stop the bouncing after the first cicle*/
    setTimeout(() => { marker.setAnimation(null) }, 600);
  }

  /*I based myself on the Udacity classes logic to populate the infowindow*/
  populateInfowindow = (place, infowindow) => {

      const marker = place.marker


      // Check to make sure the infowindow is not already opened on this marker.
      if(infowindow.marker !== marker) {
        infowindow.marker = marker;


        const clientID = 'client_id=I4HL4OWMDNTMOH2RFXVMERZ1TETMUEPQM3R0DCTSZJVDLXBY'
        const clientSecret = 'client_secret=W2FIUMMOOOBC2LZPYYIUAO5OD1AE3A0J0L2GZ4JOQNBXC4JD'
        const version = 'v=20181010'

        const requestUrl = 'https://api.foursquare.com/v2/venues/'+place.foursquareID+'/photos?'+clientID+'&'+clientSecret+'&'+version

        fetch(requestUrl)
        .then(response => response.json())
        .then((data) => this.setInfowindowContent(data, infowindow))
        .catch(e => {this.requestError(e, 'image')});


        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', () => {
          infowindow.marker = null;
        });
      }
    }

  /*...*/
  setInfowindowContent = (data, infowindow) => {
    const prefix = data.response.photos.items[0].prefix
    const suffix = data.response.photos.items[0].suffix
    //const height = data.response.photos.items[0].height
    //const width = data.response.photos.items[0].width
    const width = 120
    const height = 100
    const src = prefix+width+"x"+height+suffix

    const placeName = infowindow.marker.title


    const content = '<div>' + placeName + '</div>' +
                    '<img src=' + src + '></img>'

    infowindow.setContent(content);

    infowindow.open(this.map, infowindow.marker);

  }

  requestError = (e,part) => {
    console.log(e);
  }

  render() {
    let mapNavContainerstyle

    if(this.state.listViewVisible === true){
      mapNavContainerstyle = {
        paddingLeft: '230px'
      }
    }

    return (
      <div>
        <div id="map-nav-container" style={mapNavContainerstyle}>
          <div className="nav">
            <div className="menu-icon" onClick={this.handleToggleList}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
          <div className="map" ref="map">
            loading map...
          </div>
        </div>


        {/*If the list should display*/}
        {this.state.listViewVisible === true &&


          <div>
            <ListView
              places={this.state.places}
              populateInfowindow={this.populateInfowindow}
              infowindow={this.state.infowindow}
              map={this.map}
              animateMarker={this.animateMarker}
              google={this.props.google}
            />
          </div>



        }






      </div>


    );
  }
}

export default Map;
