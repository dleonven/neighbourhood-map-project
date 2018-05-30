import React, { Component } from 'react';

import escapeRegExp from 'escape-string-regexp'


const olStyle = {
  border: '5px solid green',
  backgroundColor: '#273D7A',
  width: '30vw',
  position: 'fixed',
  top: '50px'
}

const h1Style = {
  position: 'fixed',
  top: '0'
}

const butttonStyle = {
  position: 'fixed',
  top: '0',
  left: '300px'
}

const listStyle = {
  position: 'fixed',
  top: '0',
}

class ListView extends Component {

  constructor(props) {
    super(props);
    //this.onShelfChange = this.onShelfChange.bind(this);
  }



  state = {
    visible: false,
    query: ''
  }


  updateQuery = (query) => {
    this.setState({query: query.trim() })
  }

  handleToggleList = () => {
    this.setState({ visible: !this.state.visible })
  }


  handleOnClickListItem = (place) => {

console.log(this.props.google.maps.InfoWindow)
    this.props.animateMarker(place.marker, this.props.google)


    const clickedPlaceName = place.name
    let infowindow = this.props.infowindow

    //find which of the markers have to open the infowindow
    this.props.places.forEach(
      place => {
        if(place.name === clickedPlaceName){
          this.props.populateInfowindow(place, infowindow)
        }
      }
    )




  }



  render() {



    const places = this.props.places
    const query = this.state.query
    const map = this.props.map
    let filteredPlaces

    if(query !== ''){

      const match = new RegExp(escapeRegExp(query), 'i')

      filteredPlaces = places.filter((place) => match.test(place.name))

      //clean all marker from the map
      places.forEach( place => {
        place.marker.setMap(null)
      })

      //paint only the filtered ones
      filteredPlaces.forEach( place => {
        place.marker.setMap(map)
      })

    } else {
      filteredPlaces = places
      places.forEach( place => {

        /*If the marker object is not empty..
        this if was needed to avoid the problem that this piece of code was
        run before the marker was assigned to the place*/
        if(Object.keys(place.marker).length > 0){
          place.marker.setMap(map)
        }


      })
    }



    return(

      <div>



        <button style={butttonStyle} onClick={this.handleToggleList}>
          burguer
        </button>


      /*If the list should display*/
      {this.state.visible === true &&

        <div style={listStyle}>
          <h1 style={h1Style}>Bondi Places</h1>
          <input
            className='filter-places'
            type='text'
            placeholder='filter places'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

          <ol style={olStyle}>
            {filteredPlaces.map(
              (place) =>
                <li key={place.name} onClick={() => this.handleOnClickListItem(place)}>
                  {place.name}
                </li>
            )}
          </ol>

        </div>


      }


      </div>

    );



  }

}

export default ListView;
