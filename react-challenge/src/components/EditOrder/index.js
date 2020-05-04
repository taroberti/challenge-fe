import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { withAuthorization } from '../Session';
import SERVER_CONFIG from '../../config/serverConfig.json';
import { dateToInputDate, inputDateToPosix } from '../Utils/dateHelper';

class CreateOrderModal extends Component {
  constructor(props) {
    super(props);

    this.orderId = this.props.orderId;

    this.state = {
        title: this.props.title,
        bookingDate: dateToInputDate(new Date(this.props.bookingDate)),
        error: null
    }
  }

  onFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit = async () => {
    const { 
      title,
      bookingDate
    } = this.state;

    await fetch(`${ SERVER_CONFIG.URL }:${ SERVER_CONFIG.port }${ SERVER_CONFIG.paths.orders }/${ this.orderId }`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        bookingDate: inputDateToPosix(bookingDate)
      }),
    });

    this.props.handleClose();
  }

  render() {
    const { show, handleClose } = this.props;

    const { 
      title,
      bookingDate
    } = this.state;

    const isInvalid = title === '';

    return (
      <Container fluid className='mt-3'>
        <Modal show={ show } onHide={ handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Edit Order</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId='formTitle'>
                <Form.Label>Title:</Form.Label>
                <Form.Control type='text' name='title' placeholder='Enter title' value={ title } onChange={ this.onFormChange }/>
              </Form.Group>

              <Form.Group controlId='formBookingDate'>
                <Form.Label>Booking Date:</Form.Label>
                <Form.Control type='date' name='bookingDate' placeholder='Enter booking date' value={ bookingDate } onChange={ this.onFormChange }/>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="dark" onClick={ handleClose }>
              Close
            </Button>

            <Button variant="dark" type='submit' onClick={ this.onFormSubmit } disabled={ isInvalid }>
              Edit Order
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default withAuthorization(CreateOrderModal);