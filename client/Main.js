import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userId: '',
    };
    this.create = this.create.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async componentDidMount() {
    try {
      const users = (await axios.get('/api/users')).data;
      this.setState({ users: users });
    } catch (err) {
      console.log('ERROR');
    }

    window.addEventListener('hashchange', async () => {
      console.log(this.state.users);
    });

    if (window.location.hash.slice(1)) {
      loadInitialReservations();
    } else {
      this.setState({ userId: users[0].id });
    }
  }

  render() {
    const { users, userId } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dealers Choice Users List</h1>
        </header>
        <section>
          <br></br>
          <form>
            <button onClick={this.create}>Create User</button>
          </form>
          <div id="error">
            <ul id="usersList">
              <div>
                <UsersList users={users} deleteUser={this.deleteUser} />
              </div>
              <br></br>
            </ul>
          </div>
        </section>
      </div>
    );
  }

  async create() {
    const users = this.state.users;
    try {
      const response = await axios.post('/api/users');
      users.push(response.data);
      this.setState({ users });
    } catch (err) {
      console.log('ERROR');
    }
  }

  async deleteUser(user) {
    let { users } = this.state;
    console.log(users);
    try {
      const response = await axios.delete(`/api/users/${user.id}`);
      console.log(response.data);
      this.setState({
        users: users.filter((res) => res.id !== user.id),
      });
    } catch (err) {
      console.log('ERROR');
    }
  }

  //   async selectedUser(userId) {
  //     try {
  //       const res = await axios.get(`/api/users/${userId}`);
  //       const selectedUser = res.data;
  //       this.setState({ selectedUser });
  //     } catch (err) {
  //       console.log('There was a problem getting user info!');
  //     }
  //   }
}

const UsersList = ({ users, deleteUser }) => {
  console.log(users);
  return users.map((user) => {
    return <User user={user} key={user.id} deleteUser={deleteUser} />;
  });
};

const User = ({ user, deleteUser }) => {
  return (
    <li>
      <a href={`#${user.id}`}>
        <h3>{user.name}</h3>
      </a>
      <span>{user.imageUrl}</span>
      <button
        onClick={() => {
          deleteUser(user);
        }}
        data-id={user.id}
      >
        Remove User
      </button>
    </li>
  );
};

export default App;
