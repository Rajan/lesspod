import React, { Component } from 'react';
import userStore from '../stores/userStore';

const styles = {
  container: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: '1px solid grey',
  },
};

class SubscribeBar extends Component {
  state = {};

  onClickSubscribe = () => {
    window.open(
      `https://cleanesto.us15.list-manage.com/subscribe?u=a6c47c05dbaff74cf6b56f226&id=51189912ca&MERGE0=${escape(
        document.getElementById('emailSubscribe').value
      )}`
    );
  };

  renderBar = () => (
    <div style={styles.container}>
      <span style={{ fontSize: '1.25rem' }}>Stay updated on the latest posts from us.</span>&nbsp;&nbsp;
      <input
        type="text"
        id="emailSubscribe"
        style={{
          minWidth: '10rem',
          height: '1.7rem',
          fontSize: '1rem',
          marginTop: '0.3rem',
          backgroundColor: 'transparent',
          paddingLeft: '0.3rem',
          border: '1px solid #24D17D',
          outline: 'none',
          marginRight: '-0.3rem',
        }}
        placeholder="email address"
      />
      <button
        className="button is-success is-small"
        style={{ height: '1.7rem', marginTop: '0.3rem' }}
        onClick={() => {
          this.onClickSubscribe();
        }}
      >
        Subscribe
      </button>
    </div>
  );

  render() {
    const page = window.location.pathname.split('/')[1];
    if (!userStore.profileData && page === 'post') {
      return this.renderBar();
    }
    return <div />;
  }
}

export default SubscribeBar;
