import ValidationMessage from './ValidationMessage.jsx'

function FormInput({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={error ? 'input invalid' : 'input'}
        aria-invalid={Boolean(error)}
      />
      <ValidationMessage message={error} />
    </div>
  )
}

export default FormInput
