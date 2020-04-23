import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';
import UserCard from './UserCard';
import NewQuestion from './NewQuestion';

const WrapperGrid = ({ children }) => (
  <Grid padded='vertically' columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <div className='App'>
          <Nav />
          <WrapperGrid>
            {this.props.notLoggedIn ? (
              <Route render={() => <Login />} />
            ) : (
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/questions/:question_id' component={UserCard} />
                <Route path='/add' component={NewQuestion} />
                <Route render={() => <div>404 - Not Found Page</div>} />
              </Switch>
            )}
          </WrapperGrid>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    notLoggedIn: authedUser === null,
  };
};

export default connect(mapStateToProps)(App);
