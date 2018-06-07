import React from 'react';
import { Title, Control, Select, Button, Input } from 'bloomer';

import Header from '../components/Header';
import { getAllPostsByUser } from '../api/firebase';
import Posts from './../components/Posts';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    width: '60%',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user: this.props.history.location.state.user,
    };
  }

  componentWillMount() {
    getAllPostsByUser(this.state.user.id, this.onSuccess, this.onFailure);
  }

  onSuccess = data => {
    this.setState({
      posts: data,
    });
  };

  onFailure = data => {
    console.log('failure');
  };

  render() {
    const fullname = `${this.state.user.first} ${this.state.user.last}`.toUpperCase();
    return (
      <div>
        <Header />
        <div style={styles.container}>
          <div style={styles.content}>
            <Title>
              <b>ALL POSTS BY {fullname}</b>
            </Title>
            <div style={styles.row}>
              {/* actions row */}
              <div style={styles.row}>
                <b>{this.state.posts.length}&nbsp;</b> Posts &nbsp;
                <Button isColor="success">
                  <b>NEW POST</b>
                </Button>
              </div>
              <div>
                <Input name="search" placeholder="search posts..." isColor="white" isFocused />
              </div>
              <div style={styles.row}>
                Order By &nbsp;
                <Control>
                  <Select isColor="white">
                    <option>Publish Date</option>
                    <option>Page Views</option>
                  </Select>
                </Control>
              </div>
            </div>
            <Posts data={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
