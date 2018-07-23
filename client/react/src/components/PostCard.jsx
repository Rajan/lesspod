import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';

import userStore from '../stores/userStore';
import { deletePostFromFbase } from '../api/firebase';
import { showAlert } from './../utils/utils';
import dataStore from '../stores/dataStore';

class PostCard extends React.Component {
  getPath = params => {
    if (window.location.pathname === '/home') {
      return `/editpost/${params.slug}`;
    }
    return `/post/${params.slug}`;
  };

  getPostSummary = content => {
    let postSummary = content
      .replace(/<(?:.|\n)*?>/gm, '')
      .replace(/\./g, '. ')
      .replace(/,/g, ', ')
      .substring(0, 140);
    if (postSummary.length === 140) {
      postSummary += '...';
      return postSummary;
    }
    return postSummary;
  };

  deletePost = post => {
    deletePostFromFbase(post.id).then(response => {
      if (response.error) {
        showAlert(response.error.message, 'error');
      } else {
        dataStore.deletePost(post);
        showAlert('Post deleted!', 'success');
      }
    });
  };

  render() {
    const { post } = this.props;
    return (
      <div className="column is-12-tablet is-6-desktop is-4-widescreen">
        <article className="box">
          <div className="media">
            <div className="media-content">
              <p className="title is-5 is-spaced is-marginless">
                <Link
                  to={{
                    pathname: this.getPath(post),
                    state: {
                      // post, //693adba6e4bf11cd1eb63340e6eb27da59ac6fd5 issue explained in this commit => TLDR; routing issue of heavy state
                    },
                  }}
                >
                  {post.title}
                </Link>
              </p>

              <div className="content">
                <span className="content is-small">
                  {dayjs(post.createdAt).format('MMMM D, YYYY')} . {post.author}
                </span>
                <br />
                <p>{this.getPostSummary(post.content)}</p>

                {userStore.profileData &&
                  post.createdBy === userStore.profileData.id && (
                    <div id="post-actions">
                      <Link
                        to={{
                          pathname: `/editpost/${post.slug}`,
                          state: {
                            // post,
                          },
                        }}
                      >
                        Edit
                      </Link>
                      <span> · </span>
                      <Link
                        to={{
                          pathname: `/post/${post.slug}`,
                          state: {
                            // post,
                          },
                        }}
                      >
                        View
                      </Link>
                      <span> · </span>
                      <a
                        onClick={() => {
                          this.deletePost(post);
                        }}
                      >
                        Delete
                      </a>
                    </div>
                  )}
                <p />
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default view(PostCard);
