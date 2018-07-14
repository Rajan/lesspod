import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import userStore from '../stores/userStore';

class PostCard extends React.Component {
  getPath = params => {
    if (window.location.pathname === '/home') {
      return `/editpost/${params.id}`;
    }
    return `/post/${params.id}`;
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

  render() {
    const { post } = this.props;
    return (
      <div className="column is-12-tablet is-6-desktop is-4-widescreen">
        <article className="box">
          <div className="media">
            <div className="media-content">
              <p className="title is-5 is-spaced is-marginless">
                {' '}
                <Link
                  to={{
                    pathname: this.getPath(post),
                    state: {
                      post,
                    },
                  }}
                >
                  {post.title}{' '}
                </Link>
              </p>

              <div className="content">
                <span className="content is-small">
                  {dayjs(post.createdAt).format('MMMM D, YYYY')} . {post.author}
                </span>
                <br />
                <p>{this.getPostSummary(post.content)}</p>

                {userStore.profileData && (
                  <div id="post-actions">
                    <Link
                      to={{
                        pathname: `/editpost/${post.id}`,
                        state: {
                          post,
                        },
                      }}
                    >
                      Edit
                    </Link>
                    <span> · </span>
                    <Link
                      to={{
                        pathname: `/post/${post.id}`,
                        state: {
                          post,
                        },
                      }}
                    >
                      View
                    </Link>
                    <span> · </span>
                    <Link to={`/delete/${post.id}`}>Delete</Link>
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

export default PostCard;
