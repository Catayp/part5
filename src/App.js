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
    update()
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
        setNewSuccess('')
      }, 3000)
    } catch (exception) {
      setErrorMessage('Please provide a valid email address and password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      console.log(exception)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }
  const update = () => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))
  }
  const addBlog = async (blogObject) => {
    blogRef.current.toggableVisibility()
    const newCreateBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newCreateBlog.data))
    if(newCreateBlog) {
      setNewSuccess('blog added')
      setTimeout(() => {
        setNewSuccess('')
      }, 3000)
    } else {
      setErrorMessage("error, the blog can't insert")
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }
  const updateLike =  (id) => {
    const objLike = blogs.find(blog => blog.id === id)
    console.log(objLike)
    const updLike={ ...objLike }
    updLike.likes++
    console.log(updLike)
    blogService
      .update(id, updLike)
      .then(() => {
        update()
        setNewSuccess('+1 like')
        setTimeout(() => {
          setNewSuccess('')
        },5000)
      })
      .catch(() => {
        setErrorMessage('error al')
        setTimeout(() => {
          setErrorMessage('')
        },5000)
      })
  }
  const deleteBlog = (id) => {
    blogService
      .deleteBlog(id)
      .then(response => {
        setNewSuccess(response)
        update()
        setTimeout(() => {
          setNewSuccess('')
        },5000)
      })
      .catch((error => console.log(error)))
  }
  const loginForm = () => (
    <>
      <SuccessError errorMessage={errorMessage} successMessage={''} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="userName"
            type="text"
            value={userName}
            name="UserName"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login" type="submit">login</button>
      </form>
    </>
  )
  const blogForm = () => {
    return (
      <>
        <SuccessError successMessage={newSuccess} errorMessage={''}/>
        <span><strong>{user.name} </strong></span>
        <button onClick={handleLogout}>logout</button><br/><br/>
        <Togglable buttonLabel='newBlog' ref={blogRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <div>
          <ul>
            {blogs.map((response) =>
              <Blog
                blog={response}
                key={response.id}
                updateLike={()=>{updateLike(response.id)}}
                deleteBlog={()=>{deleteBlog(response.id)}}
              />
            )}
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
