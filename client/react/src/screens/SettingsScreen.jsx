import React from 'react';

import SettingsForm from '../components/SettingsForm';

class SettingsScreen extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-info" style={{ minHeight: 'calc(100vh - 6rem)' }}>
          <div className="hero-body">
            <div className="container ">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                  <SettingsForm history={this.props.history} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SettingsScreen;
