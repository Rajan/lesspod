import React from 'react';
import { Link } from 'react-router-dom';

import LogoMin from './../assets/images/icon.png';
import LogoType from './../assets/images/type.png';
import userStore from '../stores/userStore';
import LoginNavItem from './LoginNavItem';

const styles = {
  logoContainer: {
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoMin: {
    width: 50,
    height: 50,
    backgroundImage: `url(${LogoMin})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    margin: 20,
  },
  logoType: {
    width: 159,
    height: 47,
    backgroundImage: `url(${LogoType})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
};

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar has-shadow" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to={userStore.profileData ? '/home' : '/'}>
            <div className="navbar-item">
              <div style={styles.logoContainer}>
                <div style={styles.logoMin} />
                <div>
                  <div style={styles.logoType} />
                  <div>Serverless CMS (Web + Blog Engine)</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="/blog">Blog</Link>
            </div>
            <LoginNavItem />
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
