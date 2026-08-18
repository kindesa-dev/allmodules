function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true"></span>
      <p>Loading students...</p>
    </div>
  )
}

export default Loading