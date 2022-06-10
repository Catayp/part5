import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import SuccessError from './components/SuccessError'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newSuccess, setNewSuccess] = useState('')

  useEffect(() => {
    blogService
    .getAll()
    .then(blogs =>
      setBlogs( blogs )
    )  
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
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }
    const newCreateBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newCreateBlog.data))
    // console.log(newCreateBlog.data)
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

  const blogForm = () => (
    <>
    <SuccessError message={newSuccess} />
    <h3>{user.name}</h3>
    <button onClick={handleLogout}>logout</button>
    <h2>New Blog</h2>
    <form onSubmit={addBlog}>
      title
      <input
        value={newTitle}
        onChange={({target})=>{ setNewTitle(target.value) }}
      />
      <br/>
      author
      <input
        value={newAuthor}
        onChange={({target})=>{ setNewAuthor(target.value) }}
      />
      <br/>
      url
      <input
        value={newUrl}
        onChange={({target})=>{ setNewUrl(target.value) }}
      />
      <br/>
      likes
      <input
        value={newLikes}
        onChange={({target})=>{ setNewLikes(target.value) }}
      />
      <button type="submit">save</button>
    </form>
    <div>
      <ul>
        {blogs.map((response) => <Blog blog={response} key={response.id} />)}  
      </ul>
    </div>
       
    </>
  )
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
