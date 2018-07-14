import React, { Component } from 'react';
import Disqus from 'disqus-react';

class DisqusEmbed extends Component {
  state = {};
  render() {
    const disqusShortname = 'lesspod';
    const disqusConfig = {
      url: window.location,
      identifier: this.props.id,
      title: this.props.title,
    };
    return (
      <div>
        <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
          Comments
        </Disqus.CommentCount>
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    );
  }
}

export default DisqusEmbed;
