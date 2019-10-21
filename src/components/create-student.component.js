import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { MongooseDocument } from 'mongoose';
import moment from "moment";
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
//import Calendar from 'react-input-calendar'

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.onChangeEnglishLevel=this.onChangeEnglishLevel.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
   
    this.onChangeTechnicalSkillsCourses=this.onChangeTechnicalSkillsCourses.bind(this);
    this.onChangPersonalPresentaion=this.onChangPersonalPresentaion.bind(this);
    this.onChangeStudyFromHome=this.onChangeStudyFromHome.bind(this)
     this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email:'',
      age: '',
      phoneNumber:'',
      showComponent: false,
      englishLevel:'A1',
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false,
      technicalSkillsCourses: '',
      personalPresentation:'',
      studyFromHome: ''
    }
  }





  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
   
  }
  onChangeAge(e) {
    this.setState({ age: e.target.value })
  }
  onChangePhoneNumber(e){
    this.setState({ phoneNumber: e.target.value })
  }
  handleChange = () =>
  this.setState({ showComponent: !this.state.showComponent });
 
  onChangeEnglishLevel(e){
    this.setState({ englishLevel: e.target.value })
  }
  // onChangeAvailableToStart(event){
  //   this.setState({ availableToStart: event.target.value})
  // }
  onChangeTechnicalSkillsCourses(e){
    this.setState({ technicalSkillsCourses: e.target.value })
  }
  onChangPersonalPresentaion(e){
    this.setState({personalPresentation: e.target.value })
   }
   onChangeStudyFromHome(e){
    this.setState({studyFromHome: e.target.value })
   } 
  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
    });
  }
   
  onSubmit(e) {
    e.preventDefault();
    console.log(`Way of communication you have chosen: ${this.state.showComponent ? "Phone" : "Email"}`);
    console.log(`Way of communication you have chosen: ${this.state.availableToStart}`);
    
 
  

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      phoneNumber: this.state.phoneNumber,
      showComponent: this.state.showComponent,
      englishLevel:this.state.englishLevel,
      selectedDay:this.state.selectedDay,
      //availabletoStart: this.state.availabletoStart
      technicalSkillsCourses: this.state.technicalSkillsCourses,
      personalPresentation:this.state.personalPresentation,
      studyFromHome: this.state.studyFromHome
      
    };

    axios.post('http://localhost:4000/students/create-student', studentObject)
      .then(res => console.log(res.data))
      .catch(error=>console.log(error));

    this.setState({
      name: '',
      email:'',
      age: '',
      phoneNumber:'',
      showComponent: '',
      englishLevel:'',
      selectedDay: '',
      technicalSkillsCourses: '',
      personalPresentation:'',
      // studyFromHome: ''
    });

    //console.log('You have selected:', this.state.wayofCommunication);
  }

  render() {
    const { selectedDay, isDisabled, isEmpty } = this.state;
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmail} />
        </Form.Group>

        <Form.Group controlId="age">
          <Form.Label>Age:</Form.Label>
          <Form.Control type="number" value={this.state.age} onChange={this.onChangeAge} />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control type="number" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber} />
        </Form.Group><br/>

      <p>Way of communication:</p>
        <div>
        <label>
          <input
            type="radio"
            name="a"
            onChange={this.handleChange}
            checked={this.state.showComponent}
          />{" "}
          Phone  {" "}
        </label>
        </div>
        <div>
        <label>
          
          <input
            type="radio"
            name="a"
            onChange={this.handleChange}
            checked={!this.state.showComponent}
          />{" "}
          Email{" "}
        </label>
       {/* {this.state.showComponent ? <div>Phone</div> : <div>Email</div>} */}
      </div><br/>
        

       <Form.Group controlId="EnglishLevel">
       <Form.Label>English level:</Form.Label>
       <div>
        <select id="lang" onChange={this.onChangeEnglishLevel.bind(this)} value={this.state.englishLevel}>
          <option value="select">Please select your English Level</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
        
      </div>
        </Form.Group> <br/>


        {/* <input type="date" onChange={this.onChangeAvailableToStart}/><br/> */}
       {/* <Calendar format='DD/MM/YYYY' date={this.state.availabletoStart} /> */}
          
        {/* <div>
        <DatePicker
              selected={moment(this.state.availableToStart).format('YYYY-mm-dd') }
              onChange={this.onChangeAvailableToStart}
              //value={this.state.availabletoStart}
              name="availableToStart"
              dateFormat="YYYY-MM-dd"
            />
        </div><br/>
        <h1>{}</h1>  */}
        <div>
        <p>
          {isEmpty && 'Please type or pick a day:'}
          {!isEmpty && !selectedDay && 'Selected start date:'}
          {selectedDay && isDisabled && 'This day is disabled'}
          {selectedDay &&
            !isDisabled &&
            `You chose ${selectedDay.toLocaleDateString()}`}
        </p>
        <DayPickerInput
          value={selectedDay}
          onDayChange={this.handleDayChange}
          dayPickerProps={{
            selectedDays: selectedDay,
            disabledDays: {
              daysOfWeek: [0, 6],
            },
          }}
        />
      </div><br/>
      

       {/* <Form.Group controlId="availableToStart">
          <Form.Label>Available To Start:</Form.Label>
          <Form.Control type="date" value={this.state.availableToStart} onChange={this.onChangeAvailableToStart} />
     
        </Form.Group>  */}
      
        <Form.Group controlId="technicalSkillsAndCourses">
          <Form.Label>Technical Skills and Courses:</Form.Label>
          <Form.Control type="text" value={this.state.technicalSkillsCourses} onChange={this.onChangeTechnicalSkillsCourses} />
        </Form.Group>

        
        <Form.Group controlId="personalPresentation">
          <Form.Label>Personal Presentation:</Form.Label>
          <Form.Control type="text" value={this.state.personalPresentation} onChange={this.onChangPersonalPresentaion} />
        </Form.Group>
 
          <Form.Group controlId="studyFromHome">
           <span>Study from home </span> 
            <input type="checkbox" name="yes" value={this.state.studyFromHome}  onChange={this.onChangeStudyFromHome}/> 
          </Form.Group>  

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}
