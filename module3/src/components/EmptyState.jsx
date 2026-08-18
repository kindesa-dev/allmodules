function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        &#128269;
      </div>
      <h3>No students found</h3>
      <p>
        No students match your current search or filters. Try a different name,
        student ID, or department.
      </p>
      <button type="button" className="button button--primary" onClick={onReset}>
        Reset Search &amp; Filters
      </button>
    </div>
  );
}

export default EmptyState;