import React from 'react';

import Header from './../components/Header';
import { blueBg } from './../config/Colors';
import ProfileForm from './../components/ProfileForm';

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

class ProfileScreen extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={styles.formContainer}>
          <ProfileForm />
        </div>
      </div>
    );
  }
}

export default ProfileScreen;
