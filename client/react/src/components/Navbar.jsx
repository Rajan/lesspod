import React from 'react';
import { Link } from 'react-router-dom';

import LogoMin from './../assets/images/icon.png';
import LogoType from './../assets/images/type.png';

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
          <Link to="/">
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
              <Link to="/">Blog</Link>
            </div>
            <div className="navbar-item">
              <Link to="/services">Services</Link>
            </div>
            <div className="navbar-item">
              <a
                href="https://chat.whatsapp.com/invite/Hxse6mGibMk3Y5V9mNUjEb"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="navbar-item">
              <Link to="/why-lesspod">Why Lesspod</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
