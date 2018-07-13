import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import userStore from './../stores/userStore';
import Navbar from './../components/Navbar';
import Posts from '../components/Posts';
import Menus from '../components/Menus';

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
  bodyContainer: {
    height: '100vh',
    backgroundColor: '#F5F5F5',
  },
};

class HomeScreen extends React.Component {
  state = {};

  componentDidMount() {
    // getAllPostsByUser(this.state.user.id, this.onSuccess, this.onFailure);
  }

  render() {
    let fullName;
    if (userStore.profileData) {
      fullName = `${userStore.profileData.first} ${userStore.profileData.last}`.toUpperCase();
    }
    return (
      <div>
        <Navbar />
        <div style={styles.bodyContainer}>
          <section className="section">
            <div className="container">
              <div className="columns is-centered is-multiline">
                <Menus data={[{ name: 'menu1' }, { name: 'menu2' }]} />
                <div className="column is-two-thirds">
                  <h1 className="title">All Posts by {fullName}</h1>
                </div>
                <div className="column is-two-thirds">
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="subtitle is-5">
                          <strong>Dynamic Count</strong> Posts
                        </p>
                      </div>

                      <p className="level-item">
                        <Link to="/newpost">
                          <div className="button is-success">New Post</div>
                        </Link>
                      </p>

                      <div className="level-item is-hidden-tablet-only">
                        <div className="field has-addons">
                          <p className="control">
                            <input className="input" type="text" placeholder="Search posts..." />
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
                  <Posts
                    data={[
                      {
                        title: 'post title',
                        content: 'hellooo contnt post',
                        createdAt: dayjs(),
                        author: 'Sai Krishna',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default HomeScreen;
