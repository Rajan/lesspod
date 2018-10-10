import React from 'react';
import { view } from 'react-easy-state';
import YouTube from 'react-youtube';
 
class YoutubeVideo extends React.Component {
  render() {
    const opts = {
      height: '600',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        rel: 0
      }
    };
 
    return (
      <YouTube
        videoId="QKwdCDexYgM"
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default view(YoutubeVideo);