import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Image,
  Form,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

const LoginHeader = () => (
  <Header as='h4' block attached='top' textAlign='center'>
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in</Header.Subheader>
  </Header>
);

const LoginGrid = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign='center'>
      <Grid.Row className='login'>
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content='Loading' />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const BrandImage = () => (
  <Image
    src='https://image.flaticon.com/icons/svg/528/528079.svg'
    size='medium'
    centered
  />
);

export class Login extends Component {
  state = {
    loading: false,
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginGrid
            image={<BrandImage />}
            form={<ConnectedLoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
      </Fragment>
    );
  }
}

class LoginForm extends Component {
  state = {
    value: '',
  };
  onChange = (e, { value }) => {
    this.setState({ value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { onLoading, dispatch } = this.props;
    const authedUser = this.state.value;

    //make animation
    new Promise((resolve, reject) => {
      onLoading();
      setTimeout(() => resolve(), 500);
    }).then(() => dispatch(setAuthedUser(authedUser)));
  };
  createDropdownData = () => {
    const { users } = this.props;

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as='h1' color='blue'>
          Sign In
        </Header>
        <Form.Dropdown
          placeholder='Select a User'
          fluid
          selection
          scrolling
          options={this.createDropdownData()}
          value={value}
          onChange={this.onChange}
          required
        />
        <Form.Button content='Sign In' color='blue' disabled={disabled} fluid />
      </Form>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users),
  };
};

const ConnectedLoginForm = connect(mapStateToProps)(LoginForm);

export default Login;
