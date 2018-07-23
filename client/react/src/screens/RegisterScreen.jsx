import React from 'react';
import { view } from 'react-easy-state';

import RegisterForm from '../components/Forms/RegisterForm';
import settingsStore from '../stores/settingsStore';

const styles = {
  container: {
    backgroundColor: 'white',
    color: 'black',
    height: 500,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
};

class RegisterScreen extends React.Component {
  render() {
    const { disableNewRegistrations } = settingsStore.global;
    return (
      <div>
        <section className="hero is-info" style={{ minHeight: 'calc(100vh - 6rem)' }}>
          <div className="hero-body">
            <div className="container ">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                  {disableNewRegistrations ? (
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

export default view(RegisterScreen);
