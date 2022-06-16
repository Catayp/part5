import React, { useState } from "react"
const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  // const [newLikes, setNewLikes] = useState('')

  const addBlog =  (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <>
      <h2>New Blog</h2>
      <form onSubmit={addBlog}>
        title
        <input
          id="title"
          value={newTitle}
          onChange={({ target }) => {setNewTitle(target.value)}}
        />
        <br/>
        author
        <input
          id="author"
          value={newAuthor}
          onChange={({ target }) => {setNewAuthor(target.value)}}
        />
        <br/>
        url
        <input
          id="url"
          value={newUrl}
          onChange={({ target }) => {setNewUrl(target.value)}}
        />
        <br/>
        <button type="submit" id="saveBlog" >save</button>
      </form>
    </>
  )
}
export default BlogForm