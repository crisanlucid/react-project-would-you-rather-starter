import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';

export class UserCard extends Component {
  render() {
    const { user, children } = this.props;

    return (
      <Segment.Group>
        <Header
          as='h5'
          textAlign='left'
          block
          attached='top'
          content={`${user.name} asks:`}
        />

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={user.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>{children}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ users }, props) => {
  const user = users[props.userId];

  return {
    user,
  };
};

export default connect(mapStateToProps)(UserCard);
