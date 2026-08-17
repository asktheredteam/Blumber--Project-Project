function SocialButton({ iconClass = '', onClick }) {
  // Accessible label for the social sign-in button
  const ariaLabel = `Sign in with ${iconClass}`

  // Render the correct icon based on the provider name
  const renderIcon = () => {
    switch (iconClass) {
      case 'google':
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.86 3C6.27 7.58 8.91 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.61-.21-2.38H12v4.51h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.52z" />
            <path fill="#FBBC05" d="M5.36 14.5A7.03 7.03 0 0 1 5 12c0-.87.13-1.71.36-2.5L1.5 6.5A11.94 11.94 0 0 0 0 12c0 2.02.5 3.92 1.5 5.5l3.86-3z" />
            <path fill="#34A853" d="M12 18.96c-3.09 0-5.73-2.54-6.64-5.46l-3.86 3a11.93 11.93 0 0 0 10.5 6.5c3.27 0 6.01-1.08 8.01-2.94l-3.66-2.84c-1.07.72-2.45 1.74-4.35 1.74z" />
          </svg>
        )
      
      case 'facebook':
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#1877F2" d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <button type="button" className={`social-btn ${iconClass}`.trim()} onClick={onClick} aria-label={ariaLabel}>
      {renderIcon()}
    </button>
  )
}

export default SocialButton