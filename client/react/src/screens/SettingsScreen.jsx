import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './../styles/tabs.css';
import GlobalSettingsForm from '../components/GlobalSettingsForm';
import LandingPageSettingsForm from '../components/LandingPageSettingsForm';
import FooterSettingsForm from '../components/FooterSettingsForm';

class SettingsScreen extends React.Component {
  render() {
    return (
      <div>
        <section className="hero is-info" style={{ minHeight: 'calc(100vh - 6rem)' }}>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-5-desktop is-5-widescreen">
                  <Tabs>
                    <TabList>
                      <Tab>Global Settings</Tab>
                      <Tab>Landing Page</Tab>
                      <Tab>Footer</Tab>
                    </TabList>

                    <TabPanel>
                      <GlobalSettingsForm history={this.props.history} />
                    </TabPanel>
                    <TabPanel>
                      <LandingPageSettingsForm history={this.props.history} />
                    </TabPanel>
                    <TabPanel>
                      <FooterSettingsForm history={this.props.history} />
                    </TabPanel>
                  </Tabs>
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
