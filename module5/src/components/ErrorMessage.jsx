function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <h2>Unable to load student data. Please try again.</h2>
      <p>{message}</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}

export default ErrorMessage