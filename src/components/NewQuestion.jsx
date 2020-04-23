import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { handleAddQuestion } from '../actions/questions';
import { styles } from '../utils/helpers';

export class NewQuestion extends Component {
  state = {
    isValid: false,
    isLoading: false,
    option1: '',
    option2: '',
  };
  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { authedUser, dispatch } = this.props;
    const { option1, option2 } = this.state;

    new Promise((resolve, reject) => {
      this.setState({ isLoading: true });
      dispatch(handleAddQuestion(option1, option2, authedUser));

      setTimeout(() => resolve('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: '',
      });
      this.setState({ isValid: true });
    });
  };
  render() {
    const { option1, option2, isLoading, isValid } = this.state;
    const disabled = option1 === '' || option2 === '';

    if (isValid === true) {
      return <Redirect to='/' />;
    }
    return (
      <Segment.Group>
        <Header as='h3' textAlign='left' block attached='top'>
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Column>
            {isLoading && (
              <Dimmer active inverted>
                <Loader content='Updating' />
              </Dimmer>
            )}
            <p>Complete the question:</p>
            <p>
              <strong>Would you rather...</strong>
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id='option1'
                placeholder='Write option one...'
                value={option1}
                onChange={this.handleChange}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id='option2'
                placeholder='Write option two...'
                value={option2}
                onChange={this.handleChange}
                required
              />
              <Form.Button
                color={styles.primary.color}
                size='tiny'
                fluid
                disabled={disabled}>
                Submit
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);
