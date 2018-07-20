import React, { Component } from 'react';

export class SocialActions extends Component {
  shareOnFacebook() {
    const fbURL = `${encodeURI('https://www.facebook.com/sharer/sharer.php?u=') +
      encodeURI(window.location.href)}&t=${escape(this.props.title)}`;
    window.open(fbURL);
  }
  shareOnTwitter() {
    const twitterurl = `https://twitter.com/share?url=${encodeURI(window.location.href)}&text=${escape(
      this.props.title
    )}`;
    window.open(twitterurl);
  }
  shareOnLinkedin() {
    const linkedinurl = `${encodeURI('https://www.linkedin.com/shareArticle?mini=true&url=') +
      encodeURI(window.location.href)}&title=${escape(this.props.title)}&source=Lesspod`;
    window.open(linkedinurl);
  }

  render() {
    console.log(window.location.href);
    return (
      <div className="icon-bar">
        <a
          className="calm"
          onClick={() => {
            this.shareOnFacebook();
          }}
        >
          <i className="fa fa-facebook-f" />
        </a>
        <a
          target="_blank"
          title="Share on Twitter"
          className="calm"
          onClick={() => {
            this.shareOnTwitter();
          }}
        >
          <i className="fa fa-twitter" />
        </a>
        <a
          className="calm"
          onClick={() => {
            this.shareOnLinkedin();
          }}
        >
          <i className="fa fa-linkedin" />
        </a>
      </div>
    );
  }
}

export default SocialActions;
