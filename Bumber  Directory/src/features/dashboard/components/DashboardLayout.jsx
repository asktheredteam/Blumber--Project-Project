import { useState } from 'react'
import Sidebar from './Sidebar'
import '../../../styles/dashboard/DashboardLayout.css'

function DashboardLayout({ children }) {
  // Keep the visibility and rail-width controls as separate layout states.
  const [isSidebarVisible, setIsSidebarVisible] = useState(() =>
    typeof window === 'undefined' || !window.matchMedia('(max-width: 768px)').matches
  )
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(visible => !visible)
  }

  return (
    <div className="dashboard-layout">
      {isSidebarVisible && (
        <>
          <button
            className="sidebar-backdrop"
            type="button"
            aria-label="Close sidebar"
            onClick={toggleSidebarVisibility}
          />
          <Sidebar
            isExpanded={isSidebarExpanded}
            onToggleExpanded={() => setIsSidebarExpanded(expanded => !expanded)}
            onClose={() => setIsSidebarVisible(false)}
          />
        </>
      )}

      <main
        className={`dashboard-main${isSidebarVisible ? ' dashboard-main--sidebar-visible' : ''}${isSidebarVisible && !isSidebarExpanded ? ' dashboard-main--sidebar-minimized' : ''}`}
      >
        <button
          className="dashboard-sidebar-toggle"
          type="button"
          aria-label={isSidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
          aria-expanded={isSidebarVisible}
          onClick={toggleSidebarVisibility}
          title={isSidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
        >
          ☰
        </button>
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout