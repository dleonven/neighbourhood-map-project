import React, { Component } from 'react';
import './ListView.css';


import escapeRegExp from 'escape-string-regexp'

class ListView extends Component {

  state = {
    query: '',
    hover: false
  }

  updateQuery = (query) => {
    this.setState({query: query.trim() })
  }

  handleOnClickListItem = (place) => {

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

  toggleHover = () => {
    this.setState({ hover: !this.state.hover })
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



let style = {
  color: 'white'
}
//{this.state.hover ? "li-on-hover" : "li"}

    return(
        <div className="list-view">
          <h1 className="title">Bondi Places</h1>
          <input
            className='input'
            type='text'
            placeholder='filter places'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

          <ol>
            {filteredPlaces.map(
              (place) =>
                <li
                  className="li"
                  key={place.name}
                  onMouseOver={style={style}}
                  onMouseLeave={this.toggleHover}
                  onClick={() => this.handleOnClickListItem(place)}>
                  {place.name}
                </li>
            )}
          </ol>

        </div>
    );



  }

}

export default ListView;
