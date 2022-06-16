const Blog = ({ blog, updateLike, deleteBlog }) => {
  return(
    <li>
      {blog.title} - {blog.author}
      <button id="like" onClick={updateLike}>
        like
      </button>
      <button id="deleteBlog" onClick={deleteBlog}>
        Delete
      </button>
    </li>
  )
}
export default Blog