import React from 'react';

const Tags = props =>
  props.data.map(d => (
    <span key={d} className="button is-link is-outlined is-small is-rounded" style={{ marginRight: '0.6rem' }}>
      {d}
    </span>
  ));

export default Tags;
