import React from 'react';
import { Container, Button } from 'bloomer';
import { Link } from 'react-router-dom';

import Header from './../components/Header';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};
class LandingScreen extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container style={styles.container}>
          <p>This is landing page.</p> <br />
          <div style={styles.actionsContainer}>
            <Link to="/login">
              <Button isColor="success">Login</Button>
            </Link>&nbsp; or &nbsp;
            <Link to="/register">CREATE ACCOUNT</Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default LandingScreen;
