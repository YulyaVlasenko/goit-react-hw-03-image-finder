import React, { Component } from 'react'
import { SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput, SearchbarLayout } from './Searchbar.styed'
import PropTypes from 'prop-types'


class Searchbar extends Component {
    state = { value: '' } 
    
    handleChange = ({target: {value}}) => {
        this.setState({value: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const text = this.state.value.toLowerCase()
        this.props.onSubmit(text)
    }


    render() { 
        const {value} = this.state
        return (
            <SearchbarLayout className="searchbar">
                <SearchForm className="form" onSubmit={this.handleSubmit}>
                    <SearchFormButton type="submit" className="button">
                        <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
                    </SearchFormButton>
                    <SearchFormInput
                        className="input"
                        type="text"
                        placeholder="Search images and photos" onChange={this.handleChange} value={value}
                    />
                </SearchForm>
            </SearchbarLayout>
        );
    }
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Searchbar