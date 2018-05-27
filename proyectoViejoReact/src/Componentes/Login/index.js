// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import user from "../Global/icons/usuario.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      modal: false,
      login_correcto: false
    };

    this.toggle = this.toggle.bind(this);
    this.login = this.login.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleEmail(event) {
    var correo = event.target.value;
    this.setState({
      email: correo
    })

  }

  handlePassword(event) {
    var pass = event.target.value;
    this.setState({
      password: pass
    })

  }

  login() {
    var url = ''
    fetch('http://localhost/proyecto2-progra-web/' +
      'server/index.php/login/1/' +
      '?metodo=login&email=' + this.state.email + '&password=' + this.state.email)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          login_correcto: true,
          modal: !this.state.modal
        })
        this.forceUpdate();
      })
    
  }

  render() {
    return (
      <div>
        <a href="#" id="navbar-static-login" className="nav-link waves-effect waves-light" onClick={this.toggle}>
          <span className="mt-3 clearfix d-none d-sm-inline-block text-light">Log In</span>
          <img src={user} className="img-thumbnail imgheader ml-3" alt="login" />
        </a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className + ' modal-dialog-centered-y'}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-1"></div>
              <div className="card border-dark col-md-10">
                <div className="card-header h2">Login</div>
                <div className="card-body text-dark">
                  <form>
                    <div className="form-group">
                      <label className="sr-only" >Email</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text">@</div>
                        </div>
                        <input type="email" className="form-control" id="email" placeholder="Email"
                          onChange={this.handleEmail} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Password</label>
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <div className="input-group-text fa fa-user"></div>
                        </div>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                          onChange={this.handlePassword} />
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary" id="password" placeholder="Password"
                      onClick={this.login}>
                      Login
                          </button>
                    <small><a href="register">Or create an account</a></small>
                  </form>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            {
              this.state.login_correcto?
              window.location.href = "/search":
              ''
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}



export default Login;
