import { useState } from 'react'
import FormInput from './FormInput.jsx'
import FormSelect from './FormSelect.jsx'

const DEPARTMENTS = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
]

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

const GENDERS = ['Male', 'Female', 'Other']

const INITIAL_FORM = {
  fullName: '',
  studentId: '',
  email: '',
  phone: '',
  department: '',
  year: '',
  gender: '',
}

function validateField(name, value) {
  const text = typeof value === 'string' ? value.trim() : value

  switch (name) {
    case 'fullName':
      if (!text) return 'Full name is required.'
      if (text.length < 3) return 'Full name must be at least 3 characters long.'
      return ''
    case 'studentId':
      if (!text) return 'Student ID is required.'
      return ''
    case 'email':
      if (!text) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) return 'Enter a valid email address.'
      return ''
    case 'phone':
      if (!text) return 'Phone number is required.'
      if (!/^\+?[0-9\s()-]{7,15}$/.test(text)) return 'Enter a valid phone number (7–15 digits).'
      return ''
    case 'department':
      if (!value) return 'Please select a department.'
      return ''
    case 'year':
      if (!value) return 'Please select a year.'
      return ''
    case 'gender':
      if (!value) return 'Please select a gender.'
      return ''
    default:
      return ''
  }
}

function RegistrationForm({ onAddStudent }) {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showErrors, setShowErrors] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const allFields = Object.keys(INITIAL_FORM)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    setSuccessMessage('')
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name]) }))
  }

  function getFieldError(name) {
    return showErrors || touched[name] ? errors[name] : ''
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = {}
    for (const field of allFields) {
      nextErrors[field] = validateField(field, formData[field])
    }

    setErrors(nextErrors)
    setShowErrors(true)
    setTouched(Object.fromEntries(allFields.map((field) => [field, true])))
    setSuccessMessage('')

    const hasErrors = Object.values(nextErrors).some((error) => error)
    if (hasErrors) return

    onAddStudent(formData)
    setFormData(INITIAL_FORM)
    setErrors({})
    setTouched({})
    setShowErrors(false)
    setSuccessMessage('Student registered successfully!')
  }

  return (
    <section className="form-section">
      <h2>Register a New Student</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            placeholder="e.g. John Smith"
            error={getFieldError('fullName')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            label="Student ID"
            name="studentId"
            type="text"
            value={formData.studentId}
            placeholder="e.g. S12345"
            error={getFieldError('studentId')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-row">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="e.g. john.smith@example.com"
            error={getFieldError('email')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            placeholder="e.g. +1 555 123 4567"
            error={getFieldError('phone')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-row">
          <FormSelect
            label="Department"
            name="department"
            value={formData.department}
            options={DEPARTMENTS}
            error={getFieldError('department')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormSelect
            label="Year"
            name="year"
            value={formData.year}
            options={YEARS}
            error={getFieldError('year')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-row">
          <FormSelect
            label="Gender"
            name="gender"
            value={formData.gender}
            options={GENDERS}
            error={getFieldError('gender')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register Student
        </button>
      </form>
    </section>
  )
}

export default RegistrationForm
