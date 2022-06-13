import React, { useState } from "react"
const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const addBlog =  (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }
  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={addBlog}>
        title
        <input
          value={newTitle}
          onChange={({ target }) => {setNewTitle(target.value)}}
        />
        <br/>
        author
        <input
          value={newAuthor}
          onChange={({ target }) => {setNewAuthor(target.value)}}
        />
        <br/>
        url
        <input
          value={newUrl}
          onChange={({ target }) => {setNewUrl(target.value)}}
        />
        <br/>
        likes
        <input
          value={newLikes}
          onChange={({ target }) => {setNewLikes(target.value)}}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}
export default BlogForm