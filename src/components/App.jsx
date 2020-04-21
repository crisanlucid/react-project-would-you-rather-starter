import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';

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
            {this.props.notLoggedIn ? <Login /> : <Dashboard />}
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
