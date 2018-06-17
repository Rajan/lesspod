import React from 'react';

import Header from './../components/Header';
import { blueBg } from './../config/Colors';
import RegisterForm from './../components/RegisterForm';

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

class RegisterScreen extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={styles.formContainer}>
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
