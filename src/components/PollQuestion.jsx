import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Form, Radio } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/users';
import { styles } from '../utils/helpers';

class PollQuestion extends Component {
  state = {
    value: '',
  };

  handleChange = (e, { value }) => this.setState({ value });

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value !== '') {
      const { authedUser, question, dispatch } = this.props;

      dispatch(
        handleSaveQuestionAnswer(authedUser, question.id, this.state.value),
      );
    }
  };

  render() {
    const { question } = this.props;
    console.log(this.state.value);
    const disabled = this.state.value === '' ? true : false;

    return (
      <Fragment>
        <Header as='h4'>Would you rather</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Radio
              label={question.optionOne.text}
              name='radioGroup'
              value='optionOne'
              checked={this.state.value === 'optionOne'}
              onChange={this.handleChange}
            />
            <br />
            <Radio
              label={question.optionTwo.text}
              name='radioGroup'
              value='optionTwo'
              checked={this.state.value === 'optionTwo'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Button
              color={styles.primary.color}
              size='tiny'
              fluid
              disabled={disabled}
              content='Submit'
            />
          </Form.Field>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(PollQuestion);
