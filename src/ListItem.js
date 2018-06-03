import React, { Component } from 'react';

class ListItem extends Component {

  state = {
    hover: false
  }

  toggleHover = () => {
    this.setState({ hover: !this.state.hover })
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


  render() {

    const place = this.props.place



let style

    return(

      <li
        className={this.state.hover ? "li-on-hover" : "li"}
        onMouseOver={this.toggleHover}

        onMouseLeave={this.toggleHover}
        onClick={() => this.handleOnClickListItem(place)}
      >
        {place.name}
      </li>

    )
  }


}

export default ListItem;
