import React from 'react';

class HomeScreen extends React.Component {
  render() {
    return <div>{this.props.history.location.state.user.first}</div>;
  }
}

export default HomeScreen;
