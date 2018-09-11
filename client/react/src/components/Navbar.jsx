import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { view } from 'react-easy-state';
import { Textfit } from 'react-textfit';

import { blueBg } from './../config/Colors';
import userStore from '../stores/userStore';
import LoginNavItem from './LoginNavItem';
import NewMenuModal from './NewMenuModal';
import dataStore from '../stores/dataStore';
import NavbarUserMenus from './NavbarUserMenus';
import settingsStore from './../stores/settingsStore';
import { LOGO_HORIZONTAL_WIDTH, LOGO_HORIZONTAL_HEIGHT, LOGO_SQUARE_SIDE, FONT_WEIGHT_BOLD } from '../config/Constants';
import { isMobileDevice } from '../utils/utils';

const styles = {
  logoContainer: {
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareLogo: {
    width: isMobileDevice ? 60 : LOGO_SQUARE_SIDE,
    height: isMobileDevice ? 60 : LOGO_SQUARE_SIDE,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    marginRight: 10,
  },
  horizontalLogo: {
    width: LOGO_HORIZONTAL_WIDTH,
    height: LOGO_HORIZONTAL_HEIGHT,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
  },
  siteName: {
    color: blueBg,
    fontWeight: FONT_WEIGHT_BOLD,
    maxWidth: isMobileDevice ? window.innerWidth - 150 : 320,
  },
  tagline: {
    maxWidth: isMobileDevice ? window.innerWidth - 150 : 320,
  },
};

class NavBar extends React.Component {
  state = {
    open: false,
    isBurgerActive: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { siteName, tagline, horizontalLogoURL, squareLogoURL } = settingsStore.global;
    const { isBurgerActive } = this.state;

    return (
      <nav
        className="navbar"
        aria-label="main navigation"
        style={{
          borderBottom: '1px solid rgb(0,0,0,0.05)',
        }}
      >
        <div className="navbar-brand">
          <Link to={userStore.profileData ? '/' : '/'}>
            {/* added 'dashboard menu item so clicking on logo will take to / always. Should we change? */}
            <div className="navbar-item">
              <div style={styles.logoContainer}>
                {squareLogoURL && squareLogoURL.length > 1 ? (
                  <div
                    style={{
                      ...styles.squareLogo,
                      ...{
                        backgroundImage: `url(${squareLogoURL})`,
                      },
                    }}
                  />
                ) : null}
                <div>
                  {horizontalLogoURL && horizontalLogoURL.length > 1 ? (
                    <div
                      style={{
                        ...styles.horizontalLogo,
                        ...{
                          backgroundImage: `url(${horizontalLogoURL})`,
                        },
                      }}
                    />
                  ) : (
                    <div style={styles.siteName}>
                      <Textfit mode="single" max={24}>
                        {siteName || 'My Website'}
                      </Textfit>
                    </div>
                  )}
                  <div style={styles.tagline}>
                    <Textfit mode="single" max={22}>
                      {tagline || 'Awesome Tagline'}
                    </Textfit>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <a
            role="button"
            className={`navbar-burger ${isBurgerActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => {
              this.setState({ isBurgerActive: !isBurgerActive });
            }}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={`navbar-menu ${isBurgerActive ? 'is-active' : ''}`}>
          <div
            className="navbar-end"
            onClick={() => {
              this.setState({ isBurgerActive: false });
            }}
          >
            {userStore.profileData && (
              <div className="navbar-item">
                <Link to="/home">Dashboard</Link>
              </div>
            )}

            {userStore.profileData && (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">New</div>
                <div className="navbar-dropdown is-right">
                  <Link className="navbar-item" to="/newpost">
                    <span className="icon is-small">
                      <i className="fa fa-clipboard" />
                    </span>&nbsp; Post
                  </Link>
                  <a
                    className="navbar-item"
                    onClick={() => {
                      this.onOpenModal();
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-bars" />
                    </span>&nbsp; Menu
                  </a>
                </div>
              </div>
            )}
            <Modal
              open={this.state.open}
              onClose={this.onCloseModal}
              styles={{
                modal: {
                  padding: 0,
                },
              }}
              showCloseIcon={false}
              center
            >
              <NewMenuModal onClose={this.onCloseModal} />
            </Modal>

            {!settingsStore.global.disableBlogMenu && (
              <div className="navbar-item">
                <Link to="/blog">Blog</Link>
              </div>
            )}

            {<NavbarUserMenus data={dataStore.menus} />}

            {/* {!userStore.profileData && (
              <div className="navbar-item">
                <Link to="/register">Register</Link>
              </div>
            )} */}
            <LoginNavItem />
          </div>
        </div>
      </nav>
    );
  }
}

export default view(NavBar);
