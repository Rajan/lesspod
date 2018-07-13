import React from 'react';

import NavBar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 50,
  },
};

class RegisterScreen extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={styles.formContainer}>
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
