import logo from './logo.svg';
import './App.css';
import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      value: 'Paste text to be summarized here.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Title of Project Here</h1>
          <p>
            Summarize long lectures by copying and pasting the transcript in the textbox below!
          </p>
          <textarea 
            value={this.state.value} 
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>submit</button>
        </header>
      </div>
    );
  }
}