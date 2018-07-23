import React from 'react';

import ProfileForm from '../components/Forms/ProfileForm';

class ProfileScreen extends React.Component {
  render() {
    return (
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                <ProfileForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileScreen;
