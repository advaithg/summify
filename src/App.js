import logo from './logo.svg';
import './App.css';
import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      value: '',
      summaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    fetch('/time').then(res => res.json()).then(data => {
      this.setState({summaryText: data.summary});
      this.setState({isLoading: false});
    }).catch(error=>{
      console.log(error);
    });
    this.setState({isLoading: true});

    event.preventDefault();
  }

  render(){
    return (
      <div className="App">
        <header className="AppHeader">
          <img src={logo} className="AppLogo" alt="logo" />
          <h1>Title of Project Here</h1>
        </header>
        <section className="AppBody">
          <p>
            Summarize long lectures by copying and pasting the transcript in the textbox below!
          </p>
          <textarea 
            className = "TextArea"
            value={this.state.value} 
            onChange={this.handleChange}
            placeholder = "Paste text to be summarized here."
          />
          <button className="Button" onClick={this.handleSubmit}>Submit</button>
          {this.state.isLoading &&
          <section>
            <img src={logo} className="AppLogo" alt="logo" />
          </section>
          }
          {this.state.summaryText !== '' &&
          <section className="Summary">
            <h4 style={{textAlign:"left"}}>Summary:</h4>
            <p style={{fontSize: "large"}}>{this.state.summaryText}</p>
          </section>
          }
        </section>
      </div>
    );
  }
}