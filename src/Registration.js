import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock'
// import './Registration.css';
// import './App.css';

class Registration extends Component {
  constructor(props){
    super(props);

    this._lock = new Auth0Lock("a6awcvifCVzGv0VTtxLZ8hW3wsNezJ7N", props.domain)

    this.state = {
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      formValidation:false
    };
  }


  componentDidMount () {
    this._lock.on('authenticated', (authResult) => {

      this._lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        console.log(profile);

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      });

      console.log(authResult);
      this.props.onLogin(authResult.idToken)
    })
  }

  _showLogin = (event) => {
    event.preventDefault();
    this._lock.show()
  }

  // email validator

  // password validator

  onChangeEmail = (event) =>{
    console.log(event.target.value);
    this.setState({email:event.target.value});
  }
  onChangePassword = (event) =>{
    console.log(event.target.value);
    this.setState({password:event.target.value});
  }
  onChangeFname = (event) =>{
    console.log(event.target.value);
    this.setState({firstName:event.target.value});
  }
  onChangeLname = (event) =>{
    console.log(event.target.value);
    this.setState({lastName:event.target.value});
  }
  registerUser = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.onLogin(this.state)
  }
  render() {
    return (
      <div id="sss_registration">
          <div>
            <form className="sss_form" id="login_form">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" id="exampleInputEmail1"
                       aria-describedby="emailHelp" placeholder="Enter email"
                       value={this.state.email}
                       onChange={this.onChangeEmail}
                     />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       id="exampleInputPassword1" placeholder="Password"
                       value={this.state.password}
                       onChange={this.onChangePassword}
                      />
              </div>

              {/*confitm password field*/}

              <div className="form-group">
                <label>First Name</label>
                <input className="form-control" type="text" name="fname"
                       placeholder="First Name"
                       value={this.state.firstName}
                       onChange={this.onChangeFname}
                     />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input className="form-control" type="text" name="lname"
                       placeholder="Last Name"
                       value={this.state.lastName}
                       onChange={this.onChangeLname}
                      />
              </div>

              <div className="form-group">
                <button type="submit" className="sss-btn btn btn-info btn-block"
                        disabled={this.state.formValidation}
                        onClick={this.registerUser}>Register</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
}

export default Registration;
