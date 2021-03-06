import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import { withAuthorization } from '../Session';
import SERVER_CONFIG from '../../config/serverConfig.json';
import * as ROUTES from '../../constants/routes';
import { posixToDate } from '../Utils/dateHelper';
import CreateOrderModal from '../CreateOrder'

const OrdersTable = ({ orders }) => (
  <Table striped bordered hover variant="light">
    <thead>
      <tr>
        <th>Title</th>
        <th>Booking Date</th>
        <th>Address</th>
        <th>Customer</th>
        <th>Details</th>
      </tr>
    </thead>

    <tbody>
      {
        orders.map(order => (
          <tr key={ order.id }>
            <td>{ order.order.title }</td>
            <td>{ posixToDate(order.order.bookingDate) }</td>
            <td>{ order.order.address.street }</td>
            <td>
              {
                order.order.customer.name ?
                  order.order.customer.name :
                  order.order.customer.email
              }
            </td>
            <td>
              <Link to={`${ ROUTES.ORDERS }/${ order.id }`}>
                View Details
              </Link>
            </td>
          </tr>
        ))
      }
    </tbody>
  </Table>
)

class OrdersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      isLoading: true,
      error: null,
      show: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(`${ SERVER_CONFIG.URL }:${ SERVER_CONFIG.port }${ SERVER_CONFIG.paths.orders }`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            isLoading: false,
            orders: result.orders
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

    // When the modal closes, fetch the orders again to get any possible changes.
    fetch(`${ SERVER_CONFIG.URL }:${ SERVER_CONFIG.port }${ SERVER_CONFIG.paths.orders }`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            isLoading: false,
            orders: result.orders
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
    const { error, isLoading, orders, show } = this.state;

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
              <h5>There was a problem fetching the Orders.</h5>
            </Col>
          </Row>
        </Container>
      );
    }

    if(show) {
      return (
        <CreateOrderModal show={ show } handleClose={ this.handleClose } />
      );
    }

    return (
      <Container fluid className='mt-3'>
        <Row>
          <Col className='text-left'>
            <h4>Orders</h4>
          </Col>
          <Col className='text-right'>
            <Button variant="secondary" onClick={ this.handleShow }>Create new Order</Button>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col>
            <OrdersTable orders={ orders }/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuthorization(OrdersPage);
export { OrdersPage };