import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

class NotFoundPage extends Component {
  render() {
    return (
      <Container textAlign='center'>
        <Header as='h3'>404 - Page Not Found</Header>
        <p>Please use the menu to try again.</p>
      </Container>
    );
  }
}
export default NotFoundPage;
