import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router-dom';

import { getPageFromFbase, getPageWithSlugFromFbase } from '../api/firebase';
import Shimmer from '../components/Shimmer';
import { showAlert } from '../utils/utils';

const styles = {
  loaderContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
};

class ViewPageScreen extends Component {
  state = {
    id: '',
    title: '',
    content: '',
    tags: '',
    isLoading: true,
  };

  componentDidMount() {
    const { state } = this.props.history.location;
    if (state && state.page) {
      const { page } = state;
      this.renderPostFromFbase(page.id);
    } else {
      const slug = this.props.history.location.pathname.replace('/', '');
      getPageWithSlugFromFbase(slug).then(res => {
        if (res.error) {
          showAlert(res.error.message);
        } else if (res.data) {
          const page = res.data;
          this.setState({
            id: page.id,
            title: page.title,
            content: page.content,
            tags: page.tags,
            isLoading: false,
          });
        } else {
          this.setState({ isLoading: false, title: '404 Page Not Found' });
        }
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = nextProps.location.state;

    if (nextState && nextState.page) {
      if (nextState.page.id !== prevState.id) {
        return nextState.page;
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.setState({ isLoading: true });
      this.renderPostFromFbase(this.state.id);
    }
  }

  renderPostFromFbase = pageId => {
    getPageFromFbase(pageId).then(response => {
      if (response.error) {
        console.log(response.error.message);
      } else {
        const page = response.data;
        this.setState({
          id: page.id,
          title: page.title,
          content: page.content,
          tags: page.tags,
          isLoading: false,
        });
      }
    });
  };

  render() {
    const { title, content, isLoading } = this.state;

    if (isLoading) {
      return (
        <div style={styles.loaderContainer}>
          <Shimmer style={{ width: 600, height: 400 }} />
        </div>
      );
    }

    return (
      <div>
        <section className="section" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="columns is-centered is-multiline has-text-centered">
              <div className="column is-two-thirds">
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          className="input has-text-centered is-medium"
                          id="title"
                          type="text"
                          value={title}
                          placeholder="Post Title"
                          style={{ fontWeight: 'bold', fontSize: '2rem' }}
                          readOnly
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-two-thirds">
                <span className="has-text-left" style={{ fontSize: '1.3rem' }}>
                  {ReactHtmlParser(content)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(ViewPageScreen);
