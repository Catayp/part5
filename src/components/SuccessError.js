const Success = ({ errorMessage, successMessage }) => {
  if(errorMessage !== '' && errorMessage !== null){
    return(
      <div className='error'>
        {errorMessage}
      </div>
    )
  } else if (successMessage !== '' && successMessage !== null) {
    return(
      <div className='success'>
        {successMessage}
      </div>
    )
  }
}
export default Success