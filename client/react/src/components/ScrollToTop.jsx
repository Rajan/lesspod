import React from 'react';

class ScrollToTop extends React.Component {
  render() { // should be working for now because whenever route changes render is called
    window.scrollTo(0, 0);
    return this.props.children;
  }
}

export default ScrollToTop;
