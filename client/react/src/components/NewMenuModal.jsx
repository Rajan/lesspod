import React, { Component } from 'react';

import { addMenuToFbase, addPostToFirebase } from '../api/firebase';
import userStore from '../stores/userStore';
import { showAlert, dashedString } from './../utils/utils';
import dataStore from '../stores/dataStore';

class NewMenuModal extends Component {
  state = {
    menuName: '',
    linkedURL: '',
    // menuSelect: 'none',
    isLoading: false,
  };

  onClickSave = () => {
    const { menuName, linkedURL } = this.state;

    // matching vue => creating a post for each menu
    const postData = {
      title: menuName,
      content: '',
      pageURL: `${window.location.origin}/${dashedString(menuName)}`,
      tags: '',
      author: `${userStore.profileData.first} ${userStore.profileData.last}`,
    };

    if (menuName.length > 0) {
      this.setState({ isLoading: true });
      addPostToFirebase(postData).then(res => {
        this.setState({ isLoading: false });
        if (res.error) {
          showAlert(res.error.message, 'error');
        } else {
          const { data } = res;
          const menuData = {
            name: menuName,
            linkedURL: linkedURL.length > 0 ? linkedURL : data.pageURL,
            postId: data.id,
          };
          this.setState({ isLoading: true });
          addMenuToFbase(menuData).then(res => {
            this.setState({ isLoading: false });
            if (res.error) {
              showAlert(res.error.message, 'error');
            } else {
              dataStore.menus.push(menuData);
              showAlert('Menu added successfully', 'success');
              this.props.onClose();
            }
          });
        }
      });
    }
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add New Menu</p>
          {/* <button
            className="delete"
            aria-label="close"
            onClick={() => {
              this.props.onClose();
            }}
          /> */}
        </header>
        <section className="modal-card-body">
          <form>
            <div className="field">
              <div className="field">
                <label className="label">New Menu Name</label>
                <div className="control">
                  <input
                    className="input"
                    name="menuName"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="About Us"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Linked URL</label>
                <div className="control">
                  <input
                    className="input"
                    name="linkedURL"
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="http://www.example.com"
                  />
                </div>
              </div>
              {/* <div className="field">
                <label className="label">Under Menu</label>
                <div className="control">
                  <div className="select is-primary">
                    <select name="menuSelect" onChange={this.handleInputChange}>
                      <option value="id1">None</option>
                      <option value="id2">one</option>
                    </select>
                  </div>
                </div>
              </div> */}
            </div>
          </form>
        </section>
        <footer className="modal-card-foot" style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
          <br />
          <button
            className={`button is-success is-small ${this.state.isLoading ? 'is-loading' : ''}`}
            onClick={() => {
              this.onClickSave();
            }}
          >
            Add Menu
          </button>
          <button
            className="button is-small"
            onClick={() => {
              this.props.onClose();
            }}
          >
            Cancel
          </button>
          <br />
        </footer>
      </div>
    );
  }
}

export default NewMenuModal;
