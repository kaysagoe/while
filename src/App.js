import React, { Component } from 'react';
import './App.css';
import Lexer from "./Interpreter/Lexer";
import Parser from "./Interpreter/Parser";
import Interpreter from "./Interpreter/Intepreter";

class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            "input": "",
            "output": ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange}/>
          <button onClick={this.handleClick}>Run</button>

      </div>
    );
  }

  handleChange(event)
  {
      this.setState({"input": event.target.value});
  }

  handleClick()
  {
      let lexer = new Lexer(this.state.input);
      let parser = new Parser(lexer);
      let interpreter = new Interpreter(parser, true);

      this.setState({"output": interpreter.interpret()});
      console.log(this.state.output);
  }
}

export default App;
