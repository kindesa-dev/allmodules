import ValidationMessage from './ValidationMessage.jsx'

function FormSelect({ label, name, value, options, error, onChange, onBlur }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={error ? 'input invalid' : 'input'}
        aria-invalid={Boolean(error)}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ValidationMessage message={error} />
    </div>
  )
}

export default FormSelect
