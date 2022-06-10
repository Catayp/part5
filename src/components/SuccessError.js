const Success = ({ message }) => {
  if(message === 'Please provide a valid email address and password'){
    return(
      <div className='error'>
          {message}
      </div> 
    )
  } else if (message ==='Sesion successful') {
    return(
      <div className='success'>
        {message}
      </div>
    )
  } 
}
  export default Success