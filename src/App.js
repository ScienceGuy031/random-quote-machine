import "./App.css";
import React from "react";

let initialState = {
  text: "",
  author: "",
};

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.newQuote = this.newQuote.bind(this);
    this.gimli = this.gimli.bind(this);
  }

  newQuote() {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer APIKEY",
    };

    const fetchData = async () => {
      try{
        const rawQuotes = await fetch('https://the-one-api.dev/v2/quote', {
          headers: headers,
        });

        const quotes = await rawQuotes.json();
        const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];

        const rawCharacters = await fetch(`https://the-one-api.dev/v2/character?_id=${quote.character}`, {
          headers: headers,
        });

        const characters = await rawCharacters.json();
        const character = characters.docs[0];

        this.setState({
          text: quote.dialog,
          author: character.name,
        })

      } catch(err) {
        console.log('Failed to fetch: ', err);
      }
    };
    fetchData();
  }

  gimli() {
    this.setState({
      text: "Never thought I’d die fighting side by side with an elf.",
      author: "Gimli",
    });
  }

  componentDidMount() {
    this.newQuote();
  }

  render() {
    return (
      <div
        id="quote-box"
        className="bg-primary text-bg-primary rounded mt-5 p-3"
      >
        <blockquote className="blockquote">
          <p id="quote-text">
            <i className="fa fa-quote-left"></i>
            <span id="text">{this.state.text}</span>
          </p>
          <footer
            id="quote-author"
            className="blockquote-footer text-bg-primary text-end"
          >
            <span id="author">{this.state.author}</span>
          </footer>
          <div id="buttons">
            <div className="row">
              <div className="col-2">
                <a
                  id="tweet-quote"
                  href={`https://twitter.com/intent/tweet?text=${this.state.text} - ${this.state.author}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-square-twitter fa-2xl text-dark"></i>
                </a>
              </div>
              <div className="col-2"></div>
              <div className="col-4">
                <button
                  id="new-quote"
                  className="btn btn-dark"
                  onClick={this.newQuote}
                >
                  New quote
                </button>
              </div>
              <div className="col-4">
                <button
                  id="gimli"
                  className="btn btn-dark"
                  onClick={this.gimli}
                >
                  Gimli
                </button>
              </div>
            </div>
          </div>
        </blockquote>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App text-center">
        <div className="row">
          <div className="col" />
          <div className="col-6">
            <h1 className="display-1">Random Quote Machine</h1>
          </div>
          <div className="col" />
        </div>
        <div className="row">
          <div className="col" />
          <div className="col-6">
            <QuoteBox />
          </div>
          <div className="col" />
        </div>
      </div>
    );
  }
}

export default App;
