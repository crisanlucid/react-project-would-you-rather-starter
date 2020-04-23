import React, { Component, Fragment } from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { styles } from '../utils/helpers';

export class PollPreview extends Component {
  state = {
    viewPoll: false,
  };
  handleClick = (e) => {
    this.setState((prevState) => ({
      viewPoll: !prevState.viewPoll,
    }));
  };
  render() {
    const { question, unanswered } = this.props;

    if (this.state.viewPoll === true) {
      /* push will create a new entry to history instead of replacing
       * https://reacttraining.com/react-router/web/api/Redirect
       */

      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Header as='h5' textAlign='left'>
          Would you rather
        </Header>
        <p style={{ textAlign: 'center' }}>
          {question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          color={unanswered === true ? styles.primary.color : styles.tint.color}
          size='tiny'
          fluid
          onClick={this.handleClick}
          content={unanswered === true ? 'Answer Poll' : 'Results'}
        />
      </Fragment>
    );
  }
}

export default PollPreview;
