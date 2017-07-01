import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);

    this._lock = new Auth0Lock("a6awcvifCVzGv0VTtxLZ8hW3wsNezJ7N", props.domain)

    this.state = {
      email:'',
      password:'',
      formValidation: false
    };
  }

  // email validator

  // password validator

  onChangeEmail = (event) =>{
    this.setState({email:event.target.value});
  }
  onChangePassword = (event) =>{
    this.setState({password:event.target.value});
  }

  loginUser = (event) => {
    event.preventDefault();
    this.props.onLogin(this.state)
  }
  render() {
    const {email,password} = this.state;
    console.log(email);
    console.log(password);
    return (
      <div id="sss_login">
            <form className="sss_form" id="login_form">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" id="exampleInputEmail1"
                       aria-describedby="emailHelp" placeholder="Enter email"
                       value={this.state.email}
                       onChange={this.onChangeEmail}
                     />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       id="exampleInputPassword1" placeholder="Password"
                       value={this.state.password}
                       onChange={this.onChangePassword}
                      />
              </div>

              <div className="form-group">
                <button type="submit" className="sss-btn btn btn-info btn-block"
                        disabled={this.state.formValidation}
                        onClick={this.loginUser}>Login</button>
              </div>
            </form>
      </div>
    );
  }
}

export default Login;




// componentDidMount () {
//   this._lock.on('authenticated', (authResult) => {
//
//     this._lock.getUserInfo(authResult.accessToken, function(error, profile) {
//       if (error) {
//         // Handle error
//         return;
//       }
//
//       console.log(profile);
//
//       localStorage.setItem('accessToken', authResult.accessToken);
//       localStorage.setItem('profile', JSON.stringify(profile));
//     });
//
//     console.log(authResult);
//     this.props.onLogin(authResult.idToken)
//   })
// }
//
// _showLogin = (event) => {
//   event.preventDefault();
//   this._lock.show()
// }
