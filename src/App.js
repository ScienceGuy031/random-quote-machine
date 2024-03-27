import './App.css';
import React from 'react';

async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random')
    const random = await response.json();
    return await random;
  }
  catch(error) {
    console.log('Failed to fetch: ', error);
  }
}

function App() {

  const [quoteData, setQuoteData] = React.useState(null);

  React.useEffect(() => {
    const fetchQuote = async () => {
      const quote = await getQuote();
      setQuoteData(quote);
    };
    fetchQuote();
  }, []);

  const handleNewQuote = async () => {
    const quote = await getQuote();
    setQuoteData(quote);
  };

  return (
    <div className="App text-center">
      <div className='row'>
        <div className='col'/>
        <div className='col-6'>
          <h1 className='display-1'>Random Quote Machine</h1>
        </div>
        <div className='col'/>
      </div>
      <div className='row'>
        <div className='col'/>
        <div className='col-6'>
          {quoteData ? (
          <div id='quote-box' className='bg-primary text-bg-primary rounded mt-5 p-3'>
            <blockquote className='blockquote'>
              <p id="quote-text">
                <i className='fa fa-quote-left'></i>
                <span id='text'>{quoteData.content}</span>
              </p>
              <footer id='quote-author' className='blockquote-footer text-bg-primary text-end'>
                {quoteData.author}
              </footer>
                <div id='buttons'>
                <div className='row'>
                  <div className='col-2'>
                    <a 
                      id='tweet-quote'
                      href={`https://twitter.com/intent/tweet?text=${quoteData.content} - ${quoteData.author}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i class="fa-brands fa-square-twitter fa-2xl text-dark"></i>
                    </a>
                  </div>
                  <div className='col-6'></div>
                  <div className='col-4'>
                    <button id='new-quote' className='btn btn-dark' onClick={handleNewQuote}>New quote</button>
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
          ) : (<p>Loading quote...</p>)}
        </div>
        <div className='col'/>
      </div>
    </div>
  );
}

export default App;