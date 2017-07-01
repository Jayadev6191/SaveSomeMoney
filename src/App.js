import React, { Component } from 'react';
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'
import './App.css';
import './Registration.css';
import './Login.css';
import Registration from './Registration'
import Login from './Login'
import classNames from 'classnames';


const cid = 'a6awcvifCVzGv0VTtxLZ8hW3wsNezJ7N' // Change this
const domain = 'jakkiraju.auth0.com' // Change this
const graphcoolEndpoint = 'https://api.graph.cool/simple/v1/cj4akat834k2801415lz2f49v' // Change this

class App extends Component {
  state = {
    auth0IdToken: window.localStorage.getItem('auth0IdToken'),
    defaultSelection: true
  }

  _onLoginAuth0 = (auth0IdToken) => {
    window.localStorage.setItem('auth0IdToken', auth0IdToken)

    this.setState({ auth0IdToken })
    this._maybeCreateUser()
  }

  _register = async (data) => {
    const headers = {
      'Authorization': `Bearer ${this.state.auth0IdToken}`
    }


    const {email,password,firstName,lastName} = data;

    const transport = new Transport(graphcoolEndpoint, {headers})
    const api = new Lokka({ transport })

    // check if a user is already logged in
    const userResult = await api.query(`{
      User(email: "${email}") {
        email
      }
    }`)

    if(!userResult.User) {
      if(data) {
        try {
          var res = await api.mutate(`{
            createUser(
              email: "${email}"
              password: "${password}"
              firstName: "${firstName}"
              lastName: "${lastName}"
            ) {
              id
            }
          }`)

          console.log('res', res);
        } catch (e) {
          console.log(e);
          console.log('could not create user')
          this._logout()
        }
      }
    }else{
        return;
    }

  }

  _maybeCreateUser = async () => {
    const headers = {
      'Authorization': `Bearer ${this.state.auth0IdToken}`
    }

    const transport = new Transport(graphcoolEndpoint, {headers})
    console.log(headers);
    const api = new Lokka({ transport })

    // check if a user is already logged in
    const userResult = await api.query(`{
      user {
        id
      }
    }`)

    if (!userResult.user) {
      console.log("user does not exist");
      // need to create user
      try {
        console.log("inside try");
        console.log(this.state.auth0IdToken);
        await api.mutate(`{
          createUser(
            email: "newuser@example.com"
            firstName: "New User"
            authProvider: {
              email: {
                email: "newuser@example.com"
                password: "password"
              }
            }
          ) {
            id
          }
        }`)
      } catch (e) {
        console.log(e);
        console.log('could not create user')
        // logout to clear a potential existing auth0 token that is invalid
        this._logout()
      }
    }
  }

  _login = async (data) => {
    console.log(data);
  }

  _logout = () => {
    this.setState({
      auth0IdToken: null,
    })
    window.localStorage.removeItem('auth0IdToken')
  }

  changeSelection = () => {
    this.setState({'defaultSelection': !this.state.defaultSelection});
  }

  render() {
    const {defaultSelection} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          $ave $ome <span id="money">$</span>
        </div>
        <div className="App-body">
          <div className="selection_option">
            <div className={classNames('sss_selection', {'active' : defaultSelection === true})} onClick={this.changeSelection}>Login</div>
            <div className={classNames('sss_selection', {'active' : defaultSelection === false})} onClick={this.changeSelection}>Register</div>
          </div>
          <div className="selection_form">
            {
              defaultSelection ?
              <Login clientId={cid}
                     domain={domain}
                     onLogin={this._login} /> :

             <Registration clientId={cid}
                    domain={domain}
                    onLogin={this._register} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
