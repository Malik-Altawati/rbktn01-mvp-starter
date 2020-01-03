import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import List from './components/List.jsx';

class Pro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      users: []
    };
  }
  /////////////////////////////////////////////////////// handlerchange

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  ///////////////////////////////////////////////////////////// handle submit
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username === "" || this.state.email === "" || this.state.password === "") {
      alert("fill all feilds")
    } else {
      axios.post('/user', this.state)
        .then(function (response) {
          console.log(response);
          alert(response.data)
          $("#username").val("")
          $("#email").val("")
          $("#password").val("")
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  handleRemoveAll(event) {
    event.preventDefault();
    var that = this
    axios.get('/removeAll')
      .then(function (response) {
        that.setState({ users: [] })

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        $("#show").html("")
      });
  }

  handleShow(event) {
    event.preventDefault();
    $("#show").html("")
    var that = this
    axios.get('/users')
      .then(function (response) {
        var temp = []
        for (var i = 0; i < response.data.length; i++) {
          temp.push([response.data[i].username, response.data[i].email, response.data[i].password])
        }
        that.setState({ users: temp })

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        for (var i = 0; i < that.state.users.length; i++) {
          $("#show").append(`<div>Username:  ${that.state.users[i][0]} --- Email:  ${that.state.users[i][1]} --- password:  ${that.state.users[i][2]}</div>`)
        }
      });
  }

  handleRemoveUser(event) {
    event.preventDefault();
    var target = $("#deleteUser").val()
    axios.post('/removeOne', { username: target })
      .then(function (response) {
        console.log(response);
        alert(`${target} was Deleted`)
        // this.handleShow(event).bind(this)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUpdateUser(event) {
    event.preventDefault();
    var Username = $("#updateUser").val()
    var Email = $("#updateUserEmail").val()
    var Password = $("#updateUserPassword").val()
    var format = {
      "username": Username,
      "$set": {
        "email": Email,
        "password": Password
      }
    }
    axios.post('/updateOne', format)
      .then(function (response) {
        console.log(response);
        alert(`${target} was Updated`)
      })
      .catch(function (error) {
        console.log(error);
      })
    $("#updateUser").val("")
    $("#updateUserEmail").val("")
    $("#updateUserPassword").val("")
  }

  handledefault(event) {
    event.preventDefault();
  }


  form() {
    const { username, email, password } = this.state;
    return (
      <div>
        <center>
          <h1> MongoDB CRUD + ReactJS </h1>
          <hr></hr>
          <h2>Create User</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            Username: <br></br>
            <input type="text" id="username" onChange={this.handleChange.bind(this)} />
            <br></br> Email: <br></br>
            <input type="text" id="email" onChange={this.handleChange.bind(this)} />
            <br></br> Password: <br></br>
            <input type="text" id="password" onChange={this.handleChange.bind(this)} />
            <br></br> <br></br>
            <input type="submit" value="Create" />
          </form>
          <hr></hr>
          <strong>Delete User :</strong> <input type="text" id="deleteUser" /> <button onClick={this.handleRemoveUser.bind(this)}>Delete</button>
          <hr></hr>
          <h2>Update User Info</h2>
          <br></br> Username :<br></br> <input type="text" id="updateUser" />
          <br></br>New Email :<br></br> <input type="text" id="updateUserEmail" />
          <br></br>  New Password :<br></br> <input type="text" id="updateUserPassword" />
          <br></br>
          <br></br><button onClick={this.handleUpdateUser.bind(this)}>Update</button>
          <hr></hr>
          <br></br><button onClick={this.handleShow.bind(this)}>Show All Users / Refresh</button> &nbsp; &nbsp;
          <button onClick={this.handleRemoveAll.bind(this)}>Delete All Users</button>
          <hr></hr>
          <br></br><div id="show"></div>

        </center>
      </div>)
  }

  render() {
    return (
      <div>
        {this.form()}
      </div>
    )
  }
}


ReactDOM.render(<Pro />, document.getElementById("app"))