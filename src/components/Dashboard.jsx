import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import UserCard from './UserCard';
import PollPreview from './PollPreview';

const color = {
  orange: {
    name: 'orange',
  },
  blue: {
    name: 'blue',
  },
};

class Dashboard extends Component {
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;

    return (
      <Tab
        panes={panes({ answeredQuestions, unansweredQuestions })}
        className='tab'
      />
    );
  }
}
const panes = ({ answeredQuestions, unansweredQuestions }) => {
  console.log({ unansweredQuestions });
  return [
    {
      menuItem: 'Unanswered',
      render: () => (
        <Tab.Pane>
          {unansweredQuestions.map((question) => (
            <UserCard key={question.id} userId={question.author}>
              <PollPreview
                question={question}
                unanswered={true}
                color={color.blue.name}
              />
            </UserCard>
          ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Answered',
      render: () => (
        <Tab.Pane>
          {answeredQuestions.map((question) => (
            <UserCard key={question.id} userId={question.author}>
              <PollPreview
                question={question}
                unanswered={false}
                color={color.orange.name}
              />
            </UserCard>
          ))}
        </Tab.Pane>
      ),
    },
  ];
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  const answeredIds = Object.keys(users[authedUser].answers);

  const answeredQuestions = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    answeredQuestions,
    unansweredQuestions,
  };
};

export default connect(mapStateToProps)(Dashboard);
