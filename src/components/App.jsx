import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { Grid } from 'semantic-ui-react';
import Dashboard from './Dashboard';
import Login from './Login';

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
      <div className='App'>
        <WrapperGrid>
          {this.props.notLoggedIn ? <Login /> : <Dashboard />}
        </WrapperGrid>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    notLoggedIn: authedUser === null,
  };
};

export default connect(mapStateToProps)(App);
