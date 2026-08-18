function ValidationMessage({ message }) {
  if (!message) return null

  return <p className="error-message">{message}</p>
}

export default ValidationMessage
