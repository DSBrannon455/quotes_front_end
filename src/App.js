import './App.css';
import React, { Component } from 'react'
import NewForm from './components/NewForm'

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

  addQuote = (newQuote) => {
    const copyQuotes = [...this.state.quotes]
    copyQuotes.push(newQuote)
    this.setState({
      quotes: copyQuotes, 
    })
  }

  // USING ASYNC/AWAIT
  deleteQuote = async (id)=>{

    const url = baseUrl + "/quotes/" + id
    
    try{


      const response = await fetch(url, {method: "DELETE"})


      if (response.status === 200){
 
        const index = this.state.quotes.findIndex(quote => quote._id === id)
        const copyQuotes = [...this.state.quotes]

        copyQuotes.splice(index, 1)

        this.setState({
          quotes: copyQuotes
        })
      }

    }
    catch(err){
      console.log('error: ', err)
    }  
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
      <h1>Favorite Quotes</h1>
      <NewForm baseUrl={ baseUrl } addQuote={ this.addQuote } />
      <table>
        <tbody>
          { this.state.quotes.map(quote => {
            return (
              <tr key={quote._id} >
                <td> {quote.quote} </td>
                <td> {quote.author} </td>
                <td> {quote.likes} </td>
                <td onClick={()=> this.deleteQuote(quote._id)}>X</td>
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
