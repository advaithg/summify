import logo from './logo.svg';
import './App.css';
import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      value: '',
      summaryText: '',
      isLoading: false,
      errorText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendText = this.sendText.bind(this);

    this.fileInput = React.createRef();
  }

  sendText(text){
    fetch('/text', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text:text})
    }).then(response => {
      this.setState({isLoading: false})
      return response.json()
    })
    .then(data => {
      this.setState({summaryText: data.text})
    }).catch(error=>console.log(error));

    this.setState({summaryText: '', isLoading: true});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    this.setState({errorText: ''});
    if(this.fileInput.current.files.length !== 0){
      let fileText = ""
      console.log(this.fileInput.current.files[0]);
      const fileReader = new FileReader();
      fileReader.onload = event => {
        fileText=event.target.result;
        console.log(fileText);
        this.sendText(fileText)
      }
      fileReader.onerror = error => PromiseRejectionEvent(error);
      fileReader.readAsText(this.fileInput.current.files[0]);
      document.getElementById("fileAdded").value = "";
    }
    else if (this.state.value !== ''){
      this.sendText(this.state.value)
    }
    else {
      this.setState({errorText: 'Please enter text or upload a file'});
      // Tell user to input something
    }
    window.scrollTo(0, document.body.scrollHeight);
    event.preventDefault();
  }

  render(){
    return (
      <div className="Background">
        <div className="App">
          <header className="AppHeader">
            <img src={logo} className="AppLogo" alt="logo" />
            <h1>Summify</h1>
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
            
            OR

            <label className="FileUpload">
              Upload a .txt file
              <input id="fileAdded" type="file" accept = ".txt" ref={this.fileInput} />
            </label>

            <div>
              {this.state.errorText}
            </div>

            <button className="Button" onClick={this.handleSubmit}>Submit</button>

            {this.state.isLoading &&
            <section>
              <img src={logo} className="AppLogo" alt="logo" style={{marginTop: "100px"}} />
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
      </div>
    );
  }
}