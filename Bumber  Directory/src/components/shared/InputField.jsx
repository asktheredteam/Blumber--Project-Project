function InputField({ type, placeholder, icon, iconClass, value, onChange }) {
  // Render a reusable input with an optional icon
  return (
    <div className="input-group">
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
      <span className={`input-icon ${iconClass || ''}`}>{icon}</span>
    </div>
  )
}

export default InputField