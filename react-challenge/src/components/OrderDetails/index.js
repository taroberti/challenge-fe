import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './index.css';

import { withAuthorization } from '../Session';
import SERVER_CONFIG from '../../config/serverConfig.json';
import { posixToDate } from '../Utils/dateHelper';
import EditOrderModal from '../EditOrder'

const OrderCard = ({ order }) => { 
  const { title, bookingDate, address, customer } = order;
  const { street, city, zip, country } = address;
  const { name, email, phone } = customer;

  return (
  <Card className='card-order'>
    <Card.Header>Title</Card.Header>
    <Card.Body>
      <Card.Text>
        { title }
      </Card.Text>
    </Card.Body>
    
    <Card.Header>Booking Date</Card.Header>
    <Card.Body>
      <Card.Text>
        { posixToDate(bookingDate) }
      </Card.Text>
    </Card.Body>

    <Card.Header>Address</Card.Header>
    <Card.Body>
      { street || city || zip || country ? 
        (
          <div>
            <Card.Text>
              { street }
            </Card.Text>
            <Card.Text>
              { `${city} ${zip}` }
            </Card.Text>
            <Card.Text>
              { country }
            </Card.Text>
          </div>
        ) :
        (
          <Card.Text>
            No address information.
          </Card.Text>
        )
      }
    </Card.Body>

    <Card.Header>Customer</Card.Header>
    <Card.Body>
      {
        name || email || phone ?
        (
          <div>
            <Card.Text>
              { name }
            </Card.Text>
            <Card.Text>
              { email }
            </Card.Text>
            <Card.Text>
              { phone }
            </Card.Text>
          </div>
        ) : 
        (
          <Card.Text>
            No customer information.
          </Card.Text>
        )
      }
      
    </Card.Body>
  </Card>
)}

class OrderDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.orderId = props.match.params.id;

    this.state = {
      order: {},
      isLoading: true,
      error: null,
      show: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(`${ SERVER_CONFIG.URL }:${ SERVER_CONFIG.port }${ SERVER_CONFIG.paths.orders }/${ this.orderId }`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            isLoading: false,
            order: result.order
          });
        },
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      )
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleClose = () => {
    this.setState({ show: false, isLoading: true });

    fetch(`${ SERVER_CONFIG.URL }:${ SERVER_CONFIG.port }${ SERVER_CONFIG.paths.orders }/${ this.orderId }`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            isLoading: false,
            order: result.order
          });
        },
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoading, order, show } = this.state;

    if(isLoading) {
      return (
        <Container fluid className='mt-4'>
          <Row>
            <Col className='text-center'>
              <Spinner animation="border" role="status" variant="dark">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>

          <Row className='mt-2'>
            <Col className='text-center'>
              <h5>Please wait, loading...</h5>
            </Col>
          </Row>
        </Container>
      );
    }

    if(error) {
      return (
        <Container fluid className='mt-4'>
          <Row>
            <Col className='text-center'>
              <h5>There was a problem fetching the Order.</h5>
            </Col>
          </Row>
        </Container>
      );
    }

    if(show) {
      return (
        <EditOrderModal
          show={ show }
          handleClose={ this.handleClose }
          orderId={ this.orderId }
          title={ order.title }
          bookingDate={ order.bookingDate }
        />
      );
    }

    return (
      <Container fluid className='mt-4'>
        <Row>
          <Col>
            <OrderCard order={ order }/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className='button-order' block variant="dark" onClick={ this.handleShow }>
              Edit Order
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuthorization(OrderDetailsPage);
export { OrderDetailsPage };