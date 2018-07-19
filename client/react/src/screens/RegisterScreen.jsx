import React from 'react';

import RegisterForm from '../components/RegisterForm';
import { getSettingsFromFbase } from '../api/firebase';
import { showAlert } from '../utils/utils';

const styles = {
  container: {
    backgroundColor: 'white',
    color: 'black',
    height: 500,
    width: 300,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
};

class RegisterScreen extends React.Component {
  state = {
    isLoading: true,
    disableNewRegistrations: false,
  };

  componentDidMount() {
    getSettingsFromFbase().then(response => {
      this.setState({ isLoading: false });
      const { error, data } = response;
      if (error) {
        showAlert(error.message, 'error');
      } else {
        this.setState({ disableNewRegistrations: data.disableNewRegistrations });
      }
    });
  }

  render() {
    return (
      <div>
        <section className="hero is-info" style={{ minHeight: 'calc(100vh - 6rem)' }}>
          <div className="hero-body">
            <div className="container ">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                  {this.state.isLoading ? (
                    <div style={styles.container}>Please wait...</div>
                  ) : this.state.disableNewRegistrations ? (
                    <div style={styles.container}>
                      Registrations are disabled <br /> Contact site owner
                    </div>
                  ) : (
                    <RegisterForm history={this.props.history} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default RegisterScreen;
