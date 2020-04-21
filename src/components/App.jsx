import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div className='App'>
        {this.props.notLoggedIn ? <Login /> : <Dashboard />}
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
