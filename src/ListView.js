import React, { Component } from 'react';
import ListItem from './ListItem.js'

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


class ListView extends Component {

  state = {
    visible: false
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

    return(

      <div>



        <button style={butttonStyle} onClick={this.handleToggleList}>
          burguer
        </button>



      {this.state.visible === true &&

        <div>
          <h1 style={h1Style}>Bondi Locations</h1>


          <ol style={olStyle}>
            {this.props.displayedLocations.map(
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
