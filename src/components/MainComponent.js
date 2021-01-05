import React, { Component } from 'react';
// import './App.css';
import { Container,Row, Button } from 'reactstrap' ;
import GoogleLogin from 'react-google-login';
import About from './about';
import { connect } from 'react-redux'
import { addOrder, deleteOrder, updateOrder } from '../redux/ActionCreator';

const mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: (name, email, product, quantity) => dispatch(addOrder(name, email, product, quantity)),
  updateOrder: (id, name, email, product, quantity) => dispatch(updateOrder(id, name, email, product, quantity)),
  deleteOrder: index => dispatch(deleteOrder(index))
});

class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      route: 1,
      name: null,
      email:null
    }
  }

  handleChange = (response) => {
    this.setState({route: 2, name:response.profileObj.name, email:response.profileObj.email})
  }
  render () {
    if(this.state.route===1){
      return (
        <div className="container">
            <h2>Welcome to Utilize</h2>
            <GoogleLogin
              clientId="725313462118-4k6vn0cse9e9mmlpjltbfco0dhepivbr.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.handleChange}
              onFailure={console.log("Sorry")}
              cookiePolicy={'single_host_origin'}
          />
        </div>
    );
    }else{
      return (
        <About name={this.state.name} email={this.state.email} orders={this.props.orders} 
        addOrder={this.props.addOrder} updateOrder={this.props.updateOrder} deleteOrder = {this.props.deleteOrder} /> 
    );
    }
    
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
