import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Image,
  Label,
  Divider,
} from 'semantic-ui-react';
import { styles, findTopUsersLeaderboard } from '../utils/helpers';

const trophyColor = [...styles.trophy.color];

export class Leaderboard extends Component {
  render() {
    const { userList } = this.props;

    return (
      <Fragment>
        {userList.map((user, index) => (
          <Segment.Group key={user.id}>
            <Label corner='left' icon='winner' color={trophyColor[index]} />
            <Grid divided padded>
              <Grid.Row>
                <Grid.Column width={4} verticalAlign='middle'>
                  <Image src={user.avatarURL} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as='h3' textAlign='left'>
                    {user.name}
                  </Header>
                  <Grid>
                    <Grid.Column width={12}>Answered questions</Grid.Column>
                    <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                  </Grid>
                  <Divider />
                  <Grid>
                    <Grid.Column width={12}>Created questions</Grid.Column>
                    <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={4} textAlign='center'>
                  <Segment.Group>
                    <Header as='h5' block attached='top' content='Pct.' />
                    <Segment>
                      <Label circular color={styles.primary.color} size='big'>
                        {user.questionCount + user.answerCount}
                      </Label>
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment.Group>
        ))}
      </Fragment>
    );
  }
}

function mapStateToProps({ users }) {
  const userList = findTopUsersLeaderboard(users);
  return {
    userList,
  };
}

export default connect(mapStateToProps)(Leaderboard);
