import logo from './logo.svg';
import './App.css';
import React from 'react';
import loading from './loading.gif';
import checkmark from './checkmark.svg';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      value: "",
      summaryText: "",
      isLoading: false,
      errorText: '',
      keywords: [],
      keywordLinks: [],
      questions: '',
      questionDisplay: [],
      fileUploaded: false,
      submitClicked: false,
      fieldOfStudy: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
    this.processQuestions = this.processQuestions.bind(this);
    this.renderGoogleLink = this.renderGoogleLink.bind(this);
    this.handleStudyFieldChange = this.handleStudyFieldChange.bind(this);

    this.fileInput = React.createRef();
    this.loadingRef = React.createRef();
  }

  handleStudyFieldChange(event){
    this.setState({fieldOfStudy: event.target.value});
  }

  // Pass an object with 'key' and 'name'
  renderGoogleLink(keyAndName){
    return (
      <li key={keyAndName.key}>
        <a 
          className="Button HyperlinkButton" 
          href={`https://www.google.com/search?q=${this.state.fieldOfStudy}%20${keyAndName.name}`}
          target="_blank"
          rel = "noreferrer"
        >
          {keyAndName.name}
        </a>
      </li>
    );
  }

  processQuestions(questions){
    console.log(questions);
    var questionListArray = [];

    if(questions.length > 25)
      questions.length = 25;

    for (var question of questions){
      let distracters = [];
      let i = 0;

      let arr = [];
      arr = question.Distracters.slice(0, question.Distracters.length);
      arr.push(question.CorrectAnswer);
      arr.sort();

      //// Options
      for(; i < arr.length; i++){
        distracters.push(
          <li key={i}>
            {arr[i]}
          </li>
        );
      }

      ///// Block for each question
      var questionBlock = (
        <li key={question.QuestionPrompt}>
          {/* Question */}
          <p>{question.QuestionPrompt}</p><br />
          {question.QuestionType === "MULTIPLE_CHOICE" &&
          /* Container for options */
          <ol>{distracters}</ol>
          }
          <br />

          {/* Answer */}
          <section className="answers">
          Answer: <br />
          {question.CorrectAnswer === true && "true"}
          {question.CorrectAnswer === false && "false"}
          {question.CorrectAnswer}
          </section>
          <br />
        </li>
      );

      questionListArray.push(questionBlock);
    }

    this.setState({questionDisplay: questionListArray});
  }

  sendText(text){
    fetch('/text', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({text:text})
    }).then(response => {
      this.setState({isLoading: false})
      return response.json()
    })
    .then(data => {
      this.setState({
        summaryText: data.text, 
        keywords: data.keywords,
        questions: data.questions
      });

      var links = [];
      for(let i = 0; i < this.state.keywords.length; i++){
        links.push(this.renderGoogleLink({key: i, name: this.state.keywords[i]}));
      }

      this.setState({keywordLinks: links});

      this.processQuestions(this.state.questions);
      
    }).catch(error=>console.log(error));

    this.setState({summaryText: '', isLoading: true});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    this.setState({errorText: ''});
    this.setState({fileUploaded: false});
    this.setState({submitClicked: true});
    this.setState({summaryText: ''});
    this.setState({questions: ''});
    this.setState({questionDisplay: []});

    if(this.fileInput.current.files.length !== 0){
      let fileText = ""
      const fileReader = new FileReader();
      fileReader.onload = event => {
        fileText=event.target.result;
        if(fileText.length>100000) 
        {
          this.setState({errorText: "Your file is too long! (100000 characters maximum)"});
          document.getElementById("fileAdded").value = "";
          return;
        }
        else if(fileText.length<60)
        {
          this.setState({errorText: "Your file is too short! (60 characters minimum)"});
          document.getElementById("fileAdded").value = "";
          return;
        }
        this.sendText(fileText); 
        this.setState({fileUploaded: true});
      }
      fileReader.onerror = error => PromiseRejectionEvent(error);
      fileReader.readAsText(this.fileInput.current.files[0]);
      document.getElementById("fileAdded").value = "";
    }
    else if (this.state.value !== ""){
      this.sendText(this.state.value)
    }
    else {
      this.setState({errorText: 'Please enter text or upload a file'});
      // Tell user to input something
    }
    
    //this.loadingRef.current.scrollIntoView(false);
    //window.scrollTo(0, document.body.scrollHeight);
    event.preventDefault();
  }

  render(){
    return (
      <div className="Background">
        <div className="App">
          <header className="AppHeader">
            <img src={logo} className="AppLogo" alt="logo" />
            <h1 style={{color: "#6fa1f7", paddingLeft: "30px"}}>Summify</h1>
          </header>
          <section className="AppBody">
            <p>
              Summarize long lectures by copying and pasting the transcript in the textbox below!
            </p>
            <input 
              className = "TextArea"
              type = "text"
              value={this.state.fieldOfStudy} 
              onChange={this.handleStudyFieldChange}
              placeholder = "Field of Study (optional)"
              style={{minHeight: "20px", height: "20px"}}
            />
            <textarea 
              className = "TextArea"
              value={this.state.value} 
              onChange={this.handleChange}
              placeholder = "Paste text to be summarized here."
              maxLength= "100000"
            />
            
            <section style={{color: "#6fa1f7"}}> OR </section>

            <label className="FileUpload">
              Upload a .txt file <input id="fileAdded" type="file" accept = ".txt" ref={this.fileInput} />
              { this.state.fileUploaded &&
              //(this.state.errorText === "" && this.fileInput.current !== null) &&
              <img src={checkmark} className="AppLogo" alt="checkmark" style={{height:"20px"}} />
              }
            </label>
            <div>
              {this.state.errorText}
            </div>
            

            <button className="Button" onClick={this.handleSubmit} style={{marginTop: "30px"}}>Submit</button>
            {/* This link element is here to perform css on, as the real links
                don't show up until after the summary is generated 
            <a 
              href = "http://www.google.com"
              className="Button HyperlinkButton" 
              target="_blank"
              rel = "noreferrer"
            >
              a link
            </a>*/}
            {this.state.isLoading &&
            <section>
              <img 
                src={loading} 
                className="AppLogo" 
                alt="loading" 
                id="loadingAnim"
                style={{marginTop: "3px", height: "80px" }} 
                ref={this.loadingRef}
              />
            </section>
            }
            {this.state.summaryText !== '' && 
            <div>
              <section className="Summary" id="summary">
                <h4 style={{textAlign:"left"}}>Summary:</h4>
                <p style={{fontSize: "large", textAlign: "justify"}}>{this.state.summaryText}</p>
              </section>
              <div className="creds"> Text Summarizer provided by <a href="https://pypi.org/project/bert-extractive-summarizer/"  target="_blank" rel="noreferrer">
                  bert-extractive-summarizer
                </a>
              </div>
              <section style={{textAlign: "left", fontSize: "large"}}>
                Keep scrolling for keywords and links, along with questions from your transcript!
              </section>
              <section>
                <h4 style={{textAlign: "left"}}>Keywords:</h4>
                <ul className = "keywordList" style={{listStyleType: "none"}}>{this.state.keywordLinks}</ul>
              </section>  
              <div className="creds"> Keyword Extracter provided by <a href="https://www.cortical.io/free-tools/"  target="_blank" rel="noreferrer">
                  cortical.io
                </a>
              </div>
              {this.state.questionDisplay.length !== 0 &&
              <section style={{textAlign: "left"}}>
                <h4>Questions:</h4>
                <ol className="questions">{this.state.questionDisplay}</ol>
              </section>   
              }     
              {this.state.questionDisplay.length !== 0 &&
              <div className="creds"> Question Generator provided by <a href="http://deepquiz.com.s3-website-us-east-1.amazonaws.com/"  target="_blank" rel="noreferrer">
                  DeepQuiz
                </a>
              </div>
              }
              {this.state.questionDisplay.length === 0 &&
              <div style={{textAlign: "left"}}>
                No questions found!
              </div>
              }
            </div>
            }
            {this.state.summaryText === '' && this.state.submitClicked && !this.state.isLoading &&
            <div>
              No summary formed
            </div>
            }
          </section>
        </div>
      </div>
    );
  }
}