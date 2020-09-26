import React from 'react';

const Error = ({ error }) => (
  <div className="row error">{error && <p>{error}</p>}</div>
);

export default Error;
