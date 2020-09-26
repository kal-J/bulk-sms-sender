import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => (
    <div className="loading">
      <Loader
        type="ThreeDots"
        color="#ff4500"
        height={80}
        width={80}
      />
    </div>
  );

export default Loading;
