import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Responsive, Image, Button, Container } from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(null));
  };

  render() {
    const { authedUser, users } = this.props;

    return (
      <div className='menu-wrapper ui centered vertically padded one column grid'>
        <Container>
          <Responsive as={Menu} minWidth={651} pointing secondary>
            <Menu.Item name='home' as={NavLink} to='/' exact />
            <Menu.Item name='new question' as={NavLink} to='/add' />
            <Menu.Item name='leader board' as={NavLink} to='/leaderboard' />
            {authedUser && (
              <Menu.Menu position='right'>
                <Menu.Item>
                  <span>{`Hello, ${users[authedUser].name}`}</span>
                  <Image
                    src={users[authedUser].avatarURL}
                    avatar
                    spaced='left'
                    verticalAlign='bottom'
                  />
                </Menu.Item>
                <Menu.Item>
                  <Button
                    content='Logout'
                    labelPosition='right'
                    basic
                    icon='log out'
                    onClick={this.handleLogout}
                  />
                </Menu.Item>
              </Menu.Menu>
            )}
          </Responsive>
          <Responsive as={Fragment} maxWidth={650}>
            ...
          </Responsive>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Nav);
