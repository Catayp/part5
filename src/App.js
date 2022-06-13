import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import SuccessError from './components/SuccessError'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newSuccess, setNewSuccess] = useState('')
  const blogRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({
        userName, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(userLogin)
      )
      blogService.setToken(userLogin.token)
      setUser(userLogin)
      setUserName('')
      setPassword('')
      setNewSuccess('Sesion successful')
      setTimeout(() => {
        setNewSuccess('null')
      }, 3000)
    } catch (exception) {
      setErrorMessage('Please provide a valid email address and password')
      setTimeout(() => {
        setErrorMessage('null')
      }, 5000)
      console.log(exception)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  const addBlog = async (blogObject) => {
    blogRef.current.toggableVisibility()
    const newCreateBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newCreateBlog.data))
    if(newCreateBlog) {
      setNewSuccess('blog added')
      setTimeout(() => {
        setNewSuccess('null')
      }, 3000)
    } else {
      setErrorMessage("error, the blog can't insert")
      setTimeout(() => {
        setErrorMessage('null')
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <SuccessError message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          userName
          <input
            type="text"
            value={userName}
            name="UserName"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => {
    return (
      <>
        <SuccessError message={newSuccess} />
        <span><strong>{user.name} </strong></span>
        <button onClick={handleLogout}>logout</button><br/><br/>
        <Togglable buttonLabel='newBlog' ref={blogRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          <ul>
            {blogs.map((response) => <Blog blog={response} key={response.id} />)}
          </ul>
        </div>
      </>
    )
  }
  return (
    <div>
      <h1>blogs</h1>
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}
export default App
