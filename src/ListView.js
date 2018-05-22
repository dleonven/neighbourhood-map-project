import React, { Component } from 'react';
import ListItem from './ListItem.js'

const olStyle = {
  border: '5px solid green',
  backgroundColor: '#273D7A',
  width: '30vw',
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

  render() {

    return(

      <div>
        <button style={butttonStyle} onClick={this.handleToggleList}>
          burguer
        </button>

      {this.state.visible === true &&
        <ol style={olStyle}>
          {this.props.displayedLocations.map(
            (location) =>
              <li key={location.name}>
                {location.name}
              </li>
          )}
        </ol>

      }


      </div>

    );



  }

}

export default ListView;
