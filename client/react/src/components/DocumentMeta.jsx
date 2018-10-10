import React, { Component } from 'react';
import { view } from 'react-easy-state';
import Helmet from 'react-helmet';

export class DocumentMeta extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
          <meta name="description" content={this.props.description} />
        </Helmet>
      </div>
    );
  }
}

export default view(DocumentMeta);
