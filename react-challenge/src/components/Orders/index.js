import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

import { withAuthorization } from '../Session';
import SERVER_CONFIG from '../../config/serverConfig.json';

const formatDate = posixDate => {
  const date = new Date(posixDate);

  let month = date.getMonth() + 1;
  month = (month < 10) ? `0${ month }` : month;

  let day = date.getDate();
  day = (day < 10) ? `0${ day }` : day;

   return `${ day }.${ month }.${ date.getFullYear() }`;
}

const OrdersTable = ({ orders }) => (
  <div>
    <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>Title</th>
          <th>Booking Date</th>
          <th>Address</th>
          <th>Customer</th>
        </tr>
      </thead>

      <tbody>
        {
          orders.map(order => (
            <tr key={ order.id }>
              <td>{ order.order.title }</td>
              <td>{ formatDate(order.order.bookingDate) }</td>
              <td>{ order.order.address.street }</td>
              <td>
                {
                  order.order.customer.name ?
                    order.order.customer.name :
                    order.order.customer.email
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </div>
)

class OrdersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      isLoading: false,
      error: null
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

  render() {
    const { error, isLoading, orders } = this.state;

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
              <h6>Error: { error }</h6>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <div>
        <Container fluid className='mt-4'>
          <Row>
            <Col>
              <OrdersTable orders={ orders }/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withAuthorization(OrdersPage);