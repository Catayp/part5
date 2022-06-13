const Success = ({ message }) => {
  if(message === 'Please provide a valid email address and password' || message === "error, the blog can't insert"){
    return(
      <div className='error'>
        {message}
      </div>
    )
  } else if (message ==='Sesion successful' || message ==='blog added') {
    return(
      <div className='success'>
        {message}
      </div>
    )
  }
}
export default Success