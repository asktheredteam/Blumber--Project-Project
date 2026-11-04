import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import brandMark  from '../../../assets/Applogo.jpeg'
import '../../../styles/dashboard/Sidebar.css'

function Sidebar({ isExpanded, onToggleExpanded, onClose }) {
  const navigate = useNavigate()

  const navItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🔑', label: 'Rent', path: '/dashboard/search' },
    { icon: '📊', label: 'Monitor Activities', path: '/dashboard/activities', badge: 3 },
    { icon: '💬', label: 'Messages', path: '/dashboard/messages', badge: 3 },
    { icon: '👤', label: 'My Profile', path: '/dashboard/profile' },
    { icon: '🚩', label: 'Report', path: '/dashboard/report' },
    { icon: '❓', label: 'Help', path: '/dashboard/help' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userProfile')
    sessionStorage.removeItem('ghrems-dev-session')
    navigate('/login', { replace: true })
  }

  return (
    <aside className={`sidebar sidebar--visible${isExpanded ? ' sidebar--expanded' : ' sidebar--minimized'}`}>

      {/* Logo */}
      <div className="sidebar-logo">
        {isExpanded && <img src={brandMark} alt="Bisajo" />}
        <button
          className="sidebar-expand-toggle"
          type="button"
          aria-label={isExpanded ? 'Minimize sidebar' : 'Expand sidebar'}
          aria-expanded={isExpanded}
          onClick={onToggleExpanded}
          title={isExpanded ? 'Minimize sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? '‹' : '›'}
        </button>
      </div>

      {/* Nav links */}
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
            title={!isExpanded ? item.label : undefined}
            aria-label={!isExpanded ? item.label : undefined}
            onClick={() => {
              if (window.matchMedia('(max-width: 768px)').matches) onClose()
            }}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            {isExpanded && <span className="nav-label">{item.label}</span>}

            {/* Badge for notifications */}
            {item.badge && isExpanded && (
              <span className="nav-badge" aria-label={`${item.badge} notifications`}>{item.badge}</span>
            )}

          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        className="sidebar-logout"
        type="button"
        aria-label={!isExpanded ? 'Log out' : undefined}
        title={!isExpanded ? 'Log out' : undefined}
        onClick={handleLogout}
      >
        <span aria-hidden="true">🚪</span>
        {isExpanded && 'Log out'}
      </button>

    </aside>
  )
}

export default Sidebar