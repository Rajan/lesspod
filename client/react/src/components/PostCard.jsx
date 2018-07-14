import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

class PostCard extends React.Component {
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
              <p className="title is-5 is-spaced is-marginless">{post.title}</p>
              <div className="content">
                <span className="content is-small">
                  {dayjs(post.createdAt).format('MMMM D, YYYY')} . {post.author}
                </span>
                <br />
                <p>{this.getPostSummary(post.content)}</p>
                <Link to={`/edit:${post.id}`}>Edit</Link>
                <span> · </span>
                <Link to={`/edit:${post.id}`}>View</Link>
                <span> · </span>
                <Link to={`/delete:${post.id}`}>Delete</Link>
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
