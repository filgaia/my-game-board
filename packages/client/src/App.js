import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedIn, logout } from './auth';
import { CompanyDetail } from './CompanyDetail';
import { LoginForm } from './LoginForm';
import { GameBoard } from './GameBoard';
import { GameDetail } from './GameDetail';
import { GameForm } from './GameForm';
import { NavBar } from './NavBar';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: isLoggedIn() };
  }

  handleLogin() {
    this.setState({ loggedIn: true });
    this.router.history.push('/');
  }

  handleLogout() {
    logout();
    this.setState({ loggedIn: false });
    this.router.history.push('/');
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <div>
          <NavBar loggedIn={loggedIn} onLogout={this.handleLogout.bind(this)} />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/" component={GameBoard} />
                <Route path="/companies/:companyId" component={CompanyDetail} />
                <Route exact path="/games/new" component={GameForm} />
                <Route path="/games/:gameId" component={GameDetail} />
                <Route exact path="/login" render={() => <LoginForm onLogin={this.handleLogin.bind(this)} />} />
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}
