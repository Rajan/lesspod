import React from 'react';

import Header from './../components/Header';
import { blueBg } from './../config/Colors';
import LoginForm from './../components/LoginForm';

const styles = {
  formContainer: {
    backgroundColor: blueBg,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
};

class LoginScreen extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={styles.formContainer}>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginScreen;
