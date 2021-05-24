import './App.css';
import React, { Component } from 'react'

console.log(process.env.NODE_ENV)
let baseUrl = ''

// more on React environment variables
// https://create-react-app.dev/docs/adding-custom-environment-variables/
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: []
    }
    // if you do not use an arrow function for getQuotes()
    // this.getQuotes = this.getQuotes.bind(this)
  }

  getQuotes = () => {
    // fetch to the backend
    fetch(baseUrl + "/quotes")
    .then(res => { return res.json()
    }).then(data => { 
      this.setState({
        quotes: data,
      }) 
     })
    // take the data and call json() to convert
    // then console.log the data
    // fetch()
  }


  // component lifecycle flowchart
  // https://levelup.gitconnected.com/componentdidmakesense-react-lifecycle-explanation-393dcb19e459
  componentDidMount() {
    this.getQuotes() 
  }
  
  render () {
    console.log(this.state.quotes)
    return (
      <div className="App">
      <h1>Quotes</h1>
      <table>
        <tbody>
          { this.state.quotes.map(quote => {
            return (
              <tr key={quote.id} >
                <td> {quote.quote} </td>
                <td> {quote.author} </td>
                <td> {quote.likes} </td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
      </div>
    );
  }
}

export default App;
