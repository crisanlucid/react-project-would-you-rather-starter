import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Header,
  Segment,
  Progress,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';

const styles = {
  primary: {
    color: 'blue',
    bgColor: 'ciel',
  },
  secondary: {
    color: 'grey',
    bgColor: '#eee',
  },
};

const MyVoteLabel = () => (
  <Label color='orange' ribbon='right' className='vote'>
    <Icon name='check circle outline' size='big' className='compact' />
    <div style={{ float: 'right' }}>
      Your
      <br />
      Vote
    </div>
  </Label>
);

class PollResult extends Component {
  handleClick = (e) => {
    e.preventDefault();
    //TODO redirect to Home
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotal = optionOneVotes + optionTwoVotes;
    const currentVote = user.answers[question.id];

    let cssPrimary = styles.secondary,
      cssSecondary = styles.secondary;
    if (optionOneVotes > optionTwoVotes) {
      cssPrimary = styles.primary;
    } else if (optionTwoVotes > optionOneVotes) {
      cssSecondary = styles.primary;
    }

    return (
      <Fragment>
        <Header as='h3'>
          Results:
          <Header.Subheader style={{ fontWeight: 'bold' }}>
            Would you rather
          </Header.Subheader>
        </Header>
        <Segment style={{ backgroundColor: `${cssPrimary.bgColor}` }}>
          {currentVote === 'optionOne' && <MyVoteLabel />}
          <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
          <Progress
            percent={((optionOneVotes / votesTotal) * 100).toFixed(2)}
            progress
            color={cssPrimary.color}>
            {optionOneVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
        <Segment style={{ backgroundColor: `${cssSecondary.bgColor}` }}>
          {currentVote === 'optionTwo' && <MyVoteLabel />}

          <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
          <Progress
            percent={((optionTwoVotes / votesTotal) * 100).toFixed(2)}
            progress
            color={cssSecondary.color}>
            {optionTwoVotes} out of {votesTotal} votes
          </Progress>
        </Segment>
        <Button size='tiny' floated='right' onClick={this.handleClick}>
          Back
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  const user = users[authedUser];
  return {
    user,
  };
};

export default withRouter(connect(mapStateToProps)(PollResult));
