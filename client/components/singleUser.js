import React from 'react';

const SingleUser = (props) => {
  const { selectedUser } = props;
  const { name, imageUrl } = selectedUser;

  return (
    <div id="single-user">
      <img src={imageUrl} />
      <div id="user-info">
        <p>Name: {name}</p>
      </div>
    </div>
  );
};

export default SingleUser;
