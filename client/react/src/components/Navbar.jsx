import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { view } from 'react-easy-state';

import LogoMin from './../assets/images/icon.png';
import LogoType from './../assets/images/type.png';
import userStore from '../stores/userStore';
import LoginNavItem from './LoginNavItem';
import NewMenuModal from './NewMenuModal';
import dataStore from '../stores/dataStore';
import NavbarUserMenus from './NavbarUserMenus';
import settingsStore from './../stores/settingsStore';
import { LOGO_HORIZONTAL_WIDTH, LOGO_HORIZONTAL_HEIGHT, LOGO_SQUARE_SIDE } from '../config/Constants';

const styles = {
  logoContainer: {
    height: 75,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareLogo: {
    width: LOGO_SQUARE_SIDE,
    height: LOGO_SQUARE_SIDE,
    backgroundPosition: 'center',
    backgroundSize: '100%',
    margin: 20,
  },
  horizontalLogo: {
    width: LOGO_HORIZONTAL_WIDTH,
    height: LOGO_HORIZONTAL_HEIGHT,
    backgroundPosition: 'center',
    backgroundSize: '100%',
  },
};

class NavBar extends React.Component {
  state = {
    open: false,
  };

  // componentDidMount() {
  //   dataStore.menus = [];
  //   getAllMenusFromFbase().then(res => {
  //     if (res.error) {
  //       showAlert(res.error.message);
  //     } else {
  //       dataStore.menus = res.data;
  //     }
  //   });
  // }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { horizontalLogoURL } = settingsStore.global;
    const { squareLogoURL } = settingsStore.global;

    return (
      <nav className="navbar has-shadow" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to={userStore.profileData ? '/' : '/'}>
            {/* added 'dashboard menu item so clicking no logo will take to / always. Should we change? */}
            <div className="navbar-item">
              <div style={styles.logoContainer}>
                <div
                  style={{
                    ...styles.squareLogo,
                    ...{
                      backgroundImage: squareLogoURL.length > 1 ? `url(${squareLogoURL})` : `url(${LogoMin})`,
                    },
                  }}
                />
                <div>
                  <div
                    style={{
                      ...styles.horizontalLogo,
                      ...{
                        backgroundImage:
                          horizontalLogoURL.length > 1 ? `url(${horizontalLogoURL})` : `url(${LogoType})`,
                      },
                    }}
                  />
                  <div>Serverless CMS (Web + Blog Engine)</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {userStore.profileData && (
              <div className="navbar-item">
                <Link to="/home">Dashboard</Link>
              </div>
            )}

            {userStore.profileData && (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">New</div>
                <div className="navbar-dropdown is-right">
                  <a
                    className="navbar-item"
                    onClick={() => {
                      this.props.history.push('/newpost');
                    }}
                  >
                    <span className="icon is-small">
                      <i className="fa fa-clipboard" />
                    </span>&nbsp; Post
                  </a>
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

            {NavbarUserMenus(dataStore.menus)}

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

export default withRouter(view(NavBar));
