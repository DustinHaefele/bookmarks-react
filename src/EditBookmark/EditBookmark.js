import React, { Component } from  'react';
import BookmarkContext from '../BookmarksContext';
import config from '../config'
import './EditBookmark.css';

const Required = () => (
  <span className='EditBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static contextType = BookmarkContext;

  state = {
    error: null,
  };

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId;

   
      fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json();
        })
        .then(res => this.setState({
          title: res.title,
          url: res.url,
          description: res.description,
          rating: res.rating,
          id: res.id,
        }))
        .catch(error => console.log(error))
    }

    handleChangeTitle = e => {
      this.setState({ title: e.target.value })
    };
  
    handleChangeUrl = e => {
      this.setState({ url: e.target.value })
    };
  
    handleChangeDescription = e => {
      this.setState({ description: e.target.value })
    };
  
    handleChangeRating = e => {
      this.setState({ rating: e.target.value })
    };
  
  

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = this.state
    const bookmark = {
      title,
      url,
      description,
      rating,
    }
    this.setState({ error: null })
    fetch(config.API_ENDPOINT +`/${this.state.id}`, { 
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            throw new Error(error.message)
          })
        }
        return res.json()
      })
      .then(data => {
        this.reset(bookmark);
        this.context.EditBookmark(this.state.id, data) //need an Edit bookmark function in context
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error, title, url, description, rating } = this.state
    return (
      <section className='EditBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={this.handleChangeTitle}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={url}
              onChange={this.handleChangeUrl}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={rating}
              min='1'
              max='5'
              onChange={this.handleChangeRating}
              required
            />
          </div>
          <div className='EditBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;