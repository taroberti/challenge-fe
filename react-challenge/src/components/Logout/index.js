import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class LogOutButton extends Component {
  constructor(props) {
    super(props);
  }

  onLogOutClick = () => {
    this.props.firebase.doSignOut();
  
    this.props.history.push(ROUTES.LANDING);
  }

  render() {
    return(
      <Button variant='dark' onClick={ this.onLogOutClick }>
        Log Out
      </Button>
    );
  }
}

export default withRouter(withFirebase(LogOutButton));