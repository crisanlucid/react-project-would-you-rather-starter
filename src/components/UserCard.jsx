import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Grid, Image } from 'semantic-ui-react';
import PollQuestion from './PollQuestion';
import PollResult from './PollResult';
import PollPreview from './PollPreview';

const POLL_PREVIEW = 'POLL_PREVIEW';
const POLL_QUESTION = 'POLL_QUESTION';
const POLL_RESULT = 'POLL_RESULT';

const color = {
  orange: 'orange',
  blue: 'blue',
};

const PollContainer = (props) => {
  const { pollType, question, unanswered } = props;

  switch (pollType) {
    case POLL_PREVIEW:
      return (
        <PollPreview
          question={question}
          unanswered={unanswered}
          color={color}
        />
      );
    case POLL_QUESTION:
      return <PollQuestion question={question} color={color.blue} />;
    case POLL_RESULT:
      return <PollResult question={question} />;
    default:
      return;
  }
};
export class UserCard extends Component {
  render() {
    const { author, question, pollType, unanswered = null } = this.props;

    return (
      <Segment.Group>
        <Header as='h5' textAlign='left' block attached='top'>
          {author.name} asks:
        </Header>

        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={author.avatarURL} />
            </Grid.Column>
            <Grid.Column width={11}>
              <PollContainer
                pollType={pollType}
                question={question}
                unanswered={unanswered}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ users, questions, authedUser }, { questionId }) => {
  let question, pollType;

  if (questionId !== undefined) {
    question = questions[questionId];
    pollType = POLL_PREVIEW;
  } else {
    //todo: take from the link match.params;
    question = questions[questionId];
    const user = users[authedUser];

    pollType = POLL_QUESTION;
    if (Object.keys(user.answers).includes(question.id)) {
      pollType = POLL_RESULT;
    }
  }
  const author = users[question.author];

  return {
    question,
    author,
    pollType,
  };
};

export default connect(mapStateToProps)(UserCard);
