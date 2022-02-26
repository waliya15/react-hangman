import React, { Component } from "react";
import { randomWord } from './words'
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import AlphaButtons from "./AlphaButtons";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.iscomplete = this.iscomplete.bind(this)
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key = {ltr}
      >{ltr}</button>
    ));
  }

  resetForm = () => {
    this.setState({
      nWrong: 0, guessed: new Set(), answer: randomWord()
    })
  }

  iscomplete(){
    const check = this.state.answer.split('').map(ltr => {
      return this.state.guessed.has(ltr) ? true : false
    })
    return !check.includes(false)
  }
  /** render: render game */
  render() {
   console.log(this.iscomplete())
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        { this.state.nWrong < this.state.answer.length 
           ? <div>
              <img src={this.props.images[this.state.nWrong]} 
              alt = {`${this.state.nWrong} / ${this.props.maxWrong}`}/> 
              <p className = 'Wrong-guesses'>Wrong guesses: {this.state.nWrong}</p> 
              <p className='Hangman-word'>{this.guessedWord()}</p>
              {this.iscomplete() !== true 
              ? <p className='Hangman-btns'>{this.generateButtons()}</p> : <p>YOU WIN</p>}
              
             </div> 
         
           : <div>
              <img src={this.props.images[6]} 
               alt = {`${this.state.nWrong} / ${this.props.maxWrong}`}/>
              <h2>CORRECT WORD:</h2>
              <p className='Hangman-word'>{this.state.answer}</p>
              <h2 className = 'loser'>YOU LOSE!!!</h2>
           </div>
        }
        <button id = 'Restart' onClick ={this.resetForm}>Restart</button>
       
      </div>
    );
  }
}

export default Hangman;
