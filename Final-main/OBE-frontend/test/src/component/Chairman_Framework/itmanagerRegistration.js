import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn, Container } from "mdbreact";
import Axios from "axios";
import {withRouter} from 'react-router-dom'
import { Table } from 'reactstrap';

class FormComponent extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    ConfrimPassword: "",
    response:[]
  };
  componentDidMount(){
    fetch('http://localhost:8000/api/department')
      .then(res=>res.json())
        .then(response=>{this.setState({
        response
        })
        console.log("1st",this.state.response)
        })
        .catch(error=>console.log(error))
  }
  submitHandler = (event) => {
    event.preventDefault();
    const {
      password,
      ConfrimPassword,
      confirmed,
      email,
      username,
    } = this.state;
    if (
      password === ConfrimPassword &&
      this.state.email.length > 5 &&
      this.state.password.length >= 7 &&
      this.state.username.length > 4
    ) {
      console.log(username, email, password);
      event.target.className += " was-validated";
      Axios.post("http://localhost:8000/api/department/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
        .then(function (response) {
          console.log("rep"+response);
        })
        .catch(function (error) {
          console.log("not send");
        });
    } else {
      console.log("doesn't meet the requirements");
    }
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Container>
        <form
          className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate
        >
          <h3 style={{ lineHeight: 4 }}> Sign UP Form </h3>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.username}
                onChange={this.changeHandler}
                label="username"
                type="text"
                name="username"
                required
              ></MDBInput>{" "}
            </MDBCol>
          </MDBRow>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.email}
                onChange={this.changeHandler}
                type="email"
                name="email"
                label="email"
                required
              ></MDBInput>{" "}
            </MDBCol>
          </MDBRow>{" "}
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.password}
                onChange={this.changeHandler}
                type="password"
                name="password"
                label="password"
                required
              ></MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol xs={"8"} md={"8"}>
              <MDBInput
                value={this.state.ConfrimPassword}
                onChange={this.changeHandler}
                type="password"
                name="ConfrimPassword"
                label="password"
                required
              ></MDBInput>{" "}
            </MDBCol>{" "}
          </MDBRow>
          <div className="valid-feedback">All Set </div>
          <div >
          <MDBBtn color="primary" type="submit" style={{marginRight:'20px'}}>
            Sign Up{" "}
          </MDBBtn>
          {/* <MDBBtn color="success" type="submit" onClick={()=>{this.props.history.push('/mappeo')}}>
            Next{" "}
          </MDBBtn> */}
          </div>
        </form>
        <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>username</th>
          <th>email</th>
          <th>action</th>

          
        </tr>
      </thead>
      <tbody>
        {this.state.response.map((resp,id)=>
          
          <tr key={id}>
          <th scope="row" >{id+1}</th>
          <td>{resp.username}</td>
          <td>{resp.email}</td>
          <td><button className='btn btn-danger'>Delete</button></td>
        </tr>
        )}
      </tbody>
    </Table>
      </Container>
    );
  }
}

export default withRouter(FormComponent);
