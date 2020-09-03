import React from 'react';
//import UserInfo from './UserInfo';

const UserInfo = (props) => {
  const { user, selectedUser } = props;
  const { id, name, imageUrl } = user;

  return (
    <tr onClick={() => selectedUser(id)}>
      <td>{name}</td>
      <img src={imageUrl} />
      <td>{name}</td>
    </tr>
  );
};

export default UserInfo;
