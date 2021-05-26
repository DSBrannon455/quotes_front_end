import React, { Component } from 'react'

export default class NewForm extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            quote: '',
            author: '',
            // likes: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        // console.log(event.target.value)
        // this.setState({
            // quote: event.target.value,
            // author: event.target.value
            this.setState({ [event.target.id]: event.target.value })
        // })
    }

    handleSubmit (event) {
        event.preventDefault()
        // fetch
        fetch(this.props.baseUrl + '/quotes', {
            method: 'POST',
            body: JSON.stringify({quote: this.state.quote, author: this.state.author}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json()
        }).then( data => {
            this.props.addQuote(data)
            this.setState({
                quote: '',
                author: ''
            })
        }).catch (error => console.error({'Error': error}))
        // update props (addQuote)
        
        // clear name in state
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor
    // read more in htmlFor
    
    render () {
        console.log(this.state.quote)
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <label htmlFor="quote">Quote: </label>
                <input type="text" id="quote" name="quote" onChange={ (event) => this.handleChange(event) } value={ this.state.quote } />
                <label htmlFor="author">Author: </label>
                <input type="text" id="author" name="author" onChange={ (event) => this.handleChange(event) } value={ this.state.author } />
                {/* <label htmlFor="likes">Likes: </label>
                <input type="text" id="likes" name="likes" onChange={ (event) => this.handleChange(event) } value={ this.state.likes } /> */}
                <input type="submit" value="Add a Quote" /> 
            </form>
        )
    }
}