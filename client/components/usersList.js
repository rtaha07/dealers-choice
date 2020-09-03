import React from 'react';
import UserInfo from './userInfo';
import axios from 'axios';
//import '../server/public/style.css';

const UserList = (props) => {
  const { users, selectedUser, imageUrl } = props;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
            imageUrl={imageUrl}
            selectedUser={selectedUser}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
