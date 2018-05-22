import React, { Component } from 'react';

class ListItem extends Component {




  render() {

    return(

      <li>
        {this.props.location}
      </li>

    );



  }

}

export default ListItem;
