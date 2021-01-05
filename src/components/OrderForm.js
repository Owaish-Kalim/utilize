import React, { Component } from 'react';
import { Button, Modal, Container, ModalHeader, ModalBody, Label, Row } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class OrderForm extends Component {
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
        this.props.addOrder(values.name, values.email, values.product, values.quantity);
        // event.preventDefault();
    }


    render() {
        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Create Order</ModalHeader>
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
                                    <Control.text model=".quantity" id="Quantity" Quantity="quantity"
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
                <Button onClick={this.toggleModal}><span className="fa fa-pencil"></span>{'  '}
                    Create Order</Button>
            </>
        )
    }
}

export default OrderForm;