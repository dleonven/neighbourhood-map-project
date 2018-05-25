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
    console.log(query)
  }

  handleToggleList = () => {
    this.setState({ visible: !this.state.visible })
  }


  handleOnClickListItem = (locationName) => {

    let infoWindow = this.props.infoWindow

    //find which of the markers have to open the infowindow
    this.props.markers.forEach(
      marker => {
        if(marker.title === locationName){
          this.props.populateInfoWindow(marker, infoWindow)
        }
      }
    )




  }



  render() {

    const locations = this.props.locations
    const markers = this.props.markers
    const query = this.state.query
    let filteredLocations
    let filteredMarkers

    if(query !== ''){

      const match = new RegExp(escapeRegExp(query), 'i')

      filteredLocations = locations.filter((location) => match.test(location.name))
      filteredMarkers = markers.filter((marker) => match.test(marker.title))
    } else {
      filteredLocations = locations
      filteredMarkers = markers
    }



    return(

      <div>



        <button style={butttonStyle} onClick={this.handleToggleList}>
          burguer
        </button>


      /*If the list should display*/
      {this.state.visible === true &&

        <div style={listStyle}>
          <h1 style={h1Style}>Bondi Locations</h1>

          <input
            className='filter-locations'
            type='text'
            placeholder='filter locations'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

          <ol style={olStyle}>
            {filteredLocations.map(
              (location) =>
                <li key={location.name} onClick={() => this.handleOnClickListItem(location.name)}>
                  {location.name}
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
