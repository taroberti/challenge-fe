import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { withAuthorization } from '../Session';
import SERVER_CONFIG from '../../config/serverConfig.json';
import { dateToInputDate, inputDateToPosix } from '../Utils/dateHelper';

class CreateOrderModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: '',
        bookingDate: dateToInputDate(new Date()),
        street: '',
        city: '',
        zip: '',
        country: '',
        name: '',
        email: '',
        phone: '',
        error: null
    }
  }

  onFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onFormSubmit = async () => {
    const { 
      title,
      bookingDate,
      street,
      city,
      zip,
      country,
      name,
      email,
      phone
    } = this.state;

    await fetch(`${ SERVER_CONFIG.URL }:${ SERVER_CONFIG.port }${ SERVER_CONFIG.paths.orders }`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title,
        bookingDate: inputDateToPosix(bookingDate),
        address: {
          street,
          city,
          zip,
          country
        },
        customer: {
          name,
          email,
          phone
        }
      }),
    });

    this.props.handleClose();
  }

  render() {
    const { show, handleClose } = this.props;

    const { 
      title,
      bookingDate,
      street,
      city,
      zip,
      country,
      name,
      email,
      phone
    } = this.state;

    const isInvalid = title === '';

    return (
      <Container fluid className='mt-3'>
        <Modal show={ show } onHide={ handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Create new Order</Modal.Title>
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

              <h5>Address</h5>
              <Form.Group as={ Row } controlId="formStreet">
                <Form.Label column sm={ 2 }>Street:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="text" name='street' placeholder='Enter street and number' value={ street } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

              <Form.Group as={ Row } controlId="formZip">
                <Form.Label column sm={ 2 }>Zip:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="text" name='zip' placeholder='Enter zip code' value={ zip } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

              <Form.Group as={ Row } controlId="formCity">
                <Form.Label column sm={ 2 }>City:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="text" name='city' placeholder='Enter city' value={ city } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

              <Form.Group as={ Row } controlId="formCountry">
                <Form.Label column sm={ 2 }>Country:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="text" name='country' placeholder='Enter country' value={ country } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

              <h5>Customer</h5>
              <Form.Group as={ Row } controlId="formName">
                <Form.Label column sm={ 2 }>Name:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="text" name='name' placeholder='Enter name' value={ name } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

              <Form.Group as={ Row } controlId="formEmail">
                <Form.Label column sm={ 2 }>Email:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="email" name='email' placeholder='Enter email' value={ email } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

              <Form.Group as={ Row } controlId="formPhone">
                <Form.Label column sm={ 2 }>Phone:</Form.Label>
                <Col sm={ 10 }>
                  <Form.Control type="number" name='phone' placeholder='Enter phone number' value={ phone } onChange={ this.onFormChange } />
                </Col>
              </Form.Group>

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="dark" onClick={ handleClose }>
              Close
            </Button>

            <Button variant="dark" type='submit' onClick={ this.onFormSubmit } disabled={ isInvalid }>
              Create Order
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default withAuthorization(CreateOrderModal);