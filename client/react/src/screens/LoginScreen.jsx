import React from 'react';

import LoginForm from './../components/LoginForm';
import NavBar from '../components/Navbar';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 50,
  },
};

class LoginScreen extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={styles.formContainer}>
          <LoginForm history={this.props.history} />
        </div>
      </div>
    );
  }
}

export default LoginScreen;
