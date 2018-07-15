import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import dataStore from '../stores/dataStore';
import userStore from '../stores/userStore';
import { view } from 'react-easy-state';

class PostsToolbar extends Component {
  componentDidMount() {
    dataStore.query = '';
  }

  render() {
    const posts = dataStore.getFilteredPosts();
    return (
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-5">
              <strong>{posts.length}</strong> Posts
            </p>
          </div>

          {!!userStore.profileData && (
            <div className="level-item">
              <Link to="/newpost">
                <div className="button is-success">New Post</div>
              </Link>
            </div>
          )}

          <div className="level-item is-hidden-tablet-only">
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Search posts..."
                  onChange={event => {
                    dataStore.query = event.target.value;
                  }}
                />
              </p>
              <p className="control">
                <button className="button">Search</button>
              </p>
            </div>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">Order by</div>
          <div className="level-item">
            <div className="select">
              <select>
                <option>Publish date</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default view(PostsToolbar);
