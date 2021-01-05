import React, { Component } from 'react';
import {Col, Card, CardHeader, CardBody} from 'reactstrap';
import OrderForm from './OrderForm' ;
import { Button, Modal, Container, ModalHeader, ModalBody, Label, Row } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class RenderOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () =>  {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit = (values) => {
        this.toggleModal();
        this.props.updateOrder(this.props.order.id, values.name, values.email, values.product, values.quantity);

    }

    deleteOrder(e, index){
        e.preventDefault();
        console.log("owaish")
        this.props.deleteOrder(index);
    }

    render() {
    return (
        <>  
        <Card>
        <CardHeader></CardHeader>
            <CardBody>
                <p>Order-id: {this.props.order.id}  </p>
                <p>Customer-Name: {this.props.order.name}  </p>
                <p>Customer-email: {this.props.order.email}  </p>
                <p>Product: {this.props.order.product} </p>
                <p>Quantity: {this.props.order.quantity} </p>
                
            </CardBody>
            <div className="col-md-2">
                <button onClick={(e) => this.deleteOrder(e, this.props.order.id)} className="btn btn-danger">
                    Remove
                </button>
                <button onClick={this.toggleModal} className="btn btn-danger">
                    Update
                </button>
            </div>
        </Card>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Update Order</ModalHeader>
                    <ModalBody>
                        <Container>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="product">Product</Label>
                                    <Control.select model=".product" id="product" name="product"
                                        className="form-control"> 
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Customer Name</Label>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Customer Name" 
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="email">Customer Email</Label>
                                    <Control.text model=".email" id="email" email="email"
                                        placeholder="Customer Email" 
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Control.text model=".quantity" id="quantity" Quantity="Quantity"
                                        placeholder="Quantity" 
                                        className="form-control"
                                        validators={{
                                            required, isNumber
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                </Row>
                            </LocalForm>
                        </Container>
                    </ModalBody>
                </Modal>
        </>
    );
    }
}


function About(props) {

    const order = props.orders.slice().reverse().map((order) => {
        return (
            <>
            {/* {console.log(i)} */}
            <div className="col-12 col-md-5 m-1"  key={order.id}>
                <RenderOrder order={order}
                deleteOrder = {props.deleteOrder} updateOrder = {props.updateOrder} />
            </div>
            </>
        );
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>Welcome, {props.name}</h3>
                    <h5>Your email-id : {props.email}</h5> 
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <Col md={6}>
                <h3>List of orders</h3>
                </Col>
                <Col md={6}>
                    <OrderForm addOrder={props.addOrder}/>
                    <div className="row">
                        {order}
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default About;    