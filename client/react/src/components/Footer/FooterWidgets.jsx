import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Link } from 'react-router-dom';

import settingsStore from './../../stores/settingsStore';
import { isExternalLink, dashedString } from './../../utils/utils';
import dataStore from './../../stores/dataStore';

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid rgb(0,0,0,0.03)',
    borderTop: '2px solid rgb(0,0,0,0.05)',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 18,
  },
  menu: {
    padding: 5,
  },
};

export class FooterWidgets extends Component {
  getPath = menu =>
    // if (userStore.profileData && userStore.profileData.id === menu.createdBy) {
    //   return `/editpage/${dashedString(menu.name)}`;
    // }
    `/${dashedString(menu.name)}`;

  renderNavigation = () =>
    dataStore.menus.map(menu => {
      if (isExternalLink(menu.linkedURL)) {
        return (
          <a key={menu.id} href={menu.linkedURL} target="_blank" rel="noopener noreferrer">
            <span style={styles.menu}>&#8226;&nbsp;{menu.name}<br/></span>
          </a>
        );
      }
      return (
        <Link
          key={menu.id}
          to={{
            pathname: `${this.getPath(menu)}`,
            state: {
              page: {
                title: menu.name,
                id: menu.pageId,
              },
            },
          }}
        >
          <span style={styles.menu}>&#8226;&nbsp;{menu.name}<br/></span>
        </Link>
      );
    });

  render() {
    const { aboutUs, showNavigation, address, phoneNumber, email, facebookURL, twitterURL } = settingsStore.footer;
    return (
      <div style={styles.container}>
        <div className="columns is-centered is-multiline">
          <div className="column">
            <div style={styles.title}>About Us</div>
            <br />
            <div style={styles.content}> {aboutUs} </div>
          </div>
          {showNavigation && (
            <div className="column">
              <div style={styles.title}>Site Navigation</div>
              <br />
              <div style={styles.content}>{this.renderNavigation()}</div>
            </div>
          )}
          <div className="column">
            <div style={styles.title}>Contact Us</div>
            <br />
            <div style={styles.content}>
              <div>
                <i className="fa fa-location-arrow" />
                &nbsp; &nbsp;
                {address}
              </div>
              <br />
              <div>
                <i className="fa fa-phone" />
                &nbsp; &nbsp;
                {phoneNumber}
              </div>
              <div>
                <i className="fa fa-envelope" />
                &nbsp; &nbsp;
                {email}
              </div>
            </div>
          </div>
          <div className="column">
            <div style={styles.title}>Social</div>
            <br />
            <div style={styles.content}>
              <a href={facebookURL} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook fa-2x" />
              </a>
              &nbsp; &nbsp;
              <a href={twitterURL} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter fa-2x" />
              </a>
            </div><br/><br/>
            Powered by <a href="https://www.lesspod.com" target="_blank" rel="noopener noreferrer">Lesspod.com</a>
          </div>
        </div>
      </div>
    );
  }
}

export default view(FooterWidgets);
