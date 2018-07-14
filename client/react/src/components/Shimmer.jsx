import React from 'react';
import ContentLoader from 'react-content-loader';

const Shimmer = props => (
  <div style={{ height: 300, width: 500 }}>
    <ContentLoader height={160} width={400} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb" {...props}>
      <rect x="0" y="15" rx="4" ry="4" width="117" height="6.4" />
      <rect x="0" y="35" rx="3" ry="3" width="85" height="6.4" />
      <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
      <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
      <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
    </ContentLoader>
  </div>
);

export default Shimmer;
