import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSubject } from "../../actions/subjects";
import { getClos } from "../../actions/clos";
import {withRouter} from 'react-router-dom';
import { Table } from 'reactstrap';


export class Courses extends Component {
  //to part of component thats why we create state down there
  state = {
    response:[],
    courses:[],
    value:'',
    result:[],
    value_t:""
  };
  componentDidMount(){
      fetch('http://localhost:8000/api/te-chairman')
      .then(res=>res.json())
        .then(response=>{this.setState({
        response
        })
        console.log("1st",this.state.response)
        })
        .catch(error=>console.log(error))
    fetch('http://localhost:8000/api/courses')
        .then(res2=>res2.json())
        .then(response2=>{this.setState({
            courses:response2
        })
        console.log('2nd',this.state.courses)
        })
        .catch(error=>console.log(error))
        fetch('http://localhost:8000/api/coursesassign')
        .then(res=>res.json())
        .then(response3=>{this.setState({
          result:response3
        })
    console.log('3rd',this.state.result)
    })
    .catch(error=>console.log(error))
  }
  handleChange=(event)=>{    this.setState({value: event.target.value});  }
  onSubmit=(e)=>{
    e.preventDefault()
  }
  render() {
    console.log(this.state.response)
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h1>Alot Courses</h1>
        <select className="browser-default custom-select" name={this.state.value_t} value={this.state.value_t} onChange={(e)=>{this.setState({value_t: e.target.value_t})}}>
                <option selected>Select Subjects</option>
                {this.state.response.map((resp)=>
                    <option value={resp.email}>
                        {resp.email}
                    </option>
                )}
            </select>
        <h1>Alot Subjects</h1>
            <select className="browser-default custom-select" name={this.state.value} value={this.state.value} onChange={this.handleChange}>
                <option selected>Select Subjects</option>
                {this.state.courses.map((resp)=>
                    <option value={resp.tittle}>
                        {resp.tittle}
                    </option>
                )}
            </select>
            <br/>
                <button className='btn btn-success mt-1'
                onClick={()=>{
                  fetch('http://localhost:8000/api/coursesassign/', {
                    method: 'POST',
                    body: JSON.stringify({
                        teacher_name:"this.state.value_t",
                        subjects:"this.state.value"
                      }
                    ),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => console.log(json))
                    .catch(c=>{console.log(c)})
                }}
                >Map Course</button>
        </form>
        <br/>
        <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Techer</th>
          <th>Subject</th>
          <th>Action</th>
          
        </tr>
      </thead>
      <tbody>
        {this.state.result.map((resp,id)=>
          
          <tr key={id}>
          <th scope="row" >{id+1}</th>
          <td>{resp.teacher_name[id].email}</td>
          <td>{resp.subjects[id].tittle}</td>
          <td><button className='btn btn-danger'>Delete</button></td>
        </tr>
        )}
      </tbody>
    </Table>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clos: state.clos.clos
});

export default connect(mapStateToProps, { addSubject, getClos })(withRouter(Courses));
