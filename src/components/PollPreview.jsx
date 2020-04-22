import React, { Component, Fragment } from 'react';
import { Header, Button } from 'semantic-ui-react';

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
    const { question, unanswered, color } = this.props;

    //todo redirect to questions/:id
    console.log(this.state);
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
          color={color}
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
