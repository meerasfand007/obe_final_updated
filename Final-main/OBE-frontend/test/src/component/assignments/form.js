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
    value:[],
    result:[],
    value_t:[]
  };
  componentDidMount(){
      fetch('http://localhost:8000/api/assignment/')
      .then(res=>res.json())
        .then(response=>{this.setState({
        response
        })
        console.log("1st",this.state.response)
        })
        .catch(error=>console.log(error))
    fetch('http://localhost:8000/api/stu-teacher/')
        .then(res2=>res2.json())
        .then(response2=>{this.setState({
            courses:response2
        })
        console.log('2nd',this.state.courses)
        })
        .catch(error=>console.log(error))
        
  }
  handleChange=(event)=>{    this.setState({value: event.target.value});  }
  onSubmit=(e)=>{
    e.preventDefault()
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <h1>ASSIGNMENTS</h1>
        <select className="browser-default custom-select" name={this.state.value_t} value={this.state.value_t} onChange={(e)=>{this.setState({value_t: e.target.value_t})}}>
                <option selected>Select Assignment</option>
                {this.state.response.map((resp)=>
                    <option value={resp.title}>
                        {resp.title}
                    </option>
                )}
            </select>
        <h1>Students</h1>
            <select className="browser-default custom-select" name={this.state.value} value={this.state.value} onChange={this.handleChange}>
                <option selected>Select Students</option>
                {this.state.courses.map((resp)=>
                    <option value={resp.email}>
                        {resp.email}
                    </option>
                )}
            </select>
            <br/>
                <button className='btn btn-success mt-1'
                onClick={()=>{
                  fetch('http://localhost:8000/api/assignment_assign/', {
                    method: 'POST',
                    body: JSON.stringify({
                        student_name:this.state.value_t,
                        assignment:this.state.value
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
                >Assign</button>
        </form>
        <br/>
      
      </div>
    );
  }
}

export default (withRouter(Courses));
