import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../dashboard/components/DashboardLayout'
import PropertyMap from '../../dashboard/components/PropertyMap'
import PropertyCard from '../components/PropertyCard'
import properties from '../../../data/dummyProperties'
import '../../../styles/dashboard/SearchPage.css'

const DEV_SESSION_KEY = 'ghrems-dev-session'



const propertyTypes = [
  "Apartment", "Single Room", "Self-Contained",
  "Chamber and Hall", "Hostel", "Detached House",
  "Semi-Detached House", "Bungalow", "Full Duplex",
  "Half Duplex", "Townhouse", "Hotel", "Guest House",
  "Short-Stay Apartment", "Shop", "Office Space",
  "Warehouse", "Land"
]

const regions = [
  "Greater Accra", "Ashanti", "Western", "Eastern",
  "Central", "Northern", "Upper East", "Upper West",
  "Volta", "Brong-Ahafo", "Oti", "Savannah",
  "North East", "Western North", "Ahafo", "Bono East"
]

const nearbyRadiusKm = 10

const getDistanceInKm = (property, userLocation) => {
  if (
    !Number.isFinite(property.latitude) ||
    !Number.isFinite(property.longitude)
  ) {
    return Infinity
  }

  const toRadians = degrees => degrees * (Math.PI / 180)
  const latitudeDifference = toRadians(property.latitude - userLocation.latitude)
  const longitudeDifference = toRadians(property.longitude - userLocation.longitude)
  const haversine = Math.min(1,
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(userLocation.latitude)) *
      Math.cos(toRadians(property.latitude)) *
      Math.sin(longitudeDifference / 2) ** 2
  )

  return 6371 * 2 * Math.atan2(
    Math.sqrt(haversine),
    Math.sqrt(1 - haversine)
  )
}

const readStoredUserProfile = () => {
  try {
    const storedProfile = localStorage.getItem('userProfile')
    return storedProfile ? JSON.parse(storedProfile) : null
  } catch (error) {
    console.error('Unable to read the saved user profile.', error)
    return null
  }
}

const getInitials = (name) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

  return initials || 'U'
}

const createInitialsAvatar = (name) => {
  const initials = getInitials(name)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="#4B8467"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="34" font-weight="600">${initials}</text></svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function SearchPage() {
  const navigate = useNavigate()

  // The map layout is independent of the sidebar's visibility and width.
  const [isMapExpanded, setIsMapExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const locationRequestId = useRef(0)
  const [userProfile] = useState(readStoredUserProfile)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const isSignedIn =
    Boolean(localStorage.getItem('accessToken')) ||
    (import.meta.env.DEV && sessionStorage.getItem(DEV_SESSION_KEY) === 'true')
  const accountName =
    userProfile?.fullName || userProfile?.email || 'Your account'
  const accountAvatar =
    userProfile?.profilePicture || createInitialsAvatar(accountName)

const suggestions = useMemo(() => {
  const query = searchQuery.trim().toLowerCase()

  if (!query) return []

  const candidates = [
    ...new Set(
      properties.flatMap(property => [
        property.title,
        property.location,
        property.city,
        property.region
      ].filter(Boolean))
    )
  ]

  return candidates
    .filter(item => item.toLowerCase().includes(query))
    .slice(0, 6)
}, [searchQuery])

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    setActiveSuggestion(-1)
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by this browser.')
      return
    }

    const requestId = ++locationRequestId.current
    setLocationError('')
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (requestId !== locationRequestId.current) return

        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        })
        setIsLocating(false)
        updateFilter('sortBy', 'Nearest First')
      },
      (error) => {
        if (requestId !== locationRequestId.current) return

        const messages = {
          1: 'Location permission was denied. Allow location access to find nearby homes.',
          2: 'Your location could not be determined. Please try again.',
          3: 'Finding your location timed out. Please try again.'
        }
        setLocationError(
          messages[error.code] || 'Unable to get your location. Please try again.'
        )
        setIsLocating(false)
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    )
  }

  const clearSearchAndLocation = () => {
    locationRequestId.current += 1
    setSearchQuery('')
    setShowSuggestions(false)
    setActiveSuggestion(-1)
    setUserLocation(null)
    setLocationError('')
    setIsLocating(false)
    if (filters.sortBy === 'Nearest First') {
      updateFilter('sortBy', 'Newest First')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userProfile')
    setIsAccountMenuOpen(false)
    navigate('/login')
  }

  // All filter states
  const [filters, setFilters] = useState({
    type: 'All',
    region: '',
    minPrice: '',
    maxPrice: '',
    rentalPeriod: '',
    beds: '',
    baths: '',
    furnishing: '',
    availability: '',
    amenities: [],
    sortBy: 'Newest First'
  })

  // Update a single filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Toggle amenity selection
  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type: 'All',
      region: '',
      minPrice: '',
      maxPrice: '',
      rentalPeriod: '',
      beds: '',
      baths: '',
      furnishing: '',
      availability: '',
      amenities: [],
      sortBy: 'Newest First'
    })
    setSearchQuery('')
    locationRequestId.current += 1
    setUserLocation(null)
    setLocationError('')
    setIsLocating(false)
  }

  // Filter logic
  const filteredProperties = useMemo(() => {
    let results = [...properties]

    // Search query
    if (searchQuery.trim()) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Property type
    if (filters.type !== 'All') {
      results = results.filter(p => p.type === filters.type)
    }

    // Region
    if (filters.region) {
      results = results.filter(p => p.region === filters.region)
    }

    // Price range
    if (filters.minPrice) {
      results = results.filter(p => p.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= Number(filters.maxPrice))
    }

    // Rental period
    if (filters.rentalPeriod) {
      results = results.filter(p => p.rentalPeriod === filters.rentalPeriod)
    }

    // Bedrooms
    if (filters.beds) {
      results = results.filter(p => p.beds >= Number(filters.beds))
    }

    // Bathrooms
    if (filters.baths) {
      results = results.filter(p => p.baths >= Number(filters.baths))
    }

    // Furnishing
    if (filters.furnishing) {
      results = results.filter(p => p.furnishing === filters.furnishing)
    }

    // Availability
    if (filters.availability) {
      results = results.filter(p => p.availability === filters.availability)
    }

    // Amenities
    if (filters.amenities.length > 0) {
      results = results.filter(p =>
        filters.amenities.every(a => p.amenities.includes(a))
      )
    }

    if (userLocation) {
      results = results.filter(
        property => getDistanceInKm(property, userLocation) <= nearbyRadiusKm
      )
    }

    // Sort
    if (filters.sortBy === 'Nearest First' && userLocation) {
      results.sort(
        (a, b) =>
          getDistanceInKm(a, userLocation) - getDistanceInKm(b, userLocation)
      )
    } else if (filters.sortBy === 'Lowest Price') {
      results.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'Highest Price') {
      results.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'Oldest First') {
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return results
  }, [searchQuery, filters, userLocation])

  const quickTabs = ['All', 'Apartment', 'Hostel', 'Detached House', 'Single Room']

  return (
    <DashboardLayout>
      <div className="search-page">

        {/* Top bar */}
        <div className="search-topbar">
          <div>
            <h1>Find Your Next Home in Accra</h1>
            <p>Discover comfortable, safe and affordable homes in your city.</p>
          </div>
          <div className="search-topbar-right">
            <span className="notif-icon">🔔</span>

            <div
              className="account-menu"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsAccountMenuOpen(false)
                }
              }}
            >
              <button
                className="user-profile"
                type="button"
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsAccountMenuOpen(open => !open)}
              >
                <img className="user-avatar" src={accountAvatar} alt="" />
                <span>{isSignedIn ? accountName : 'Sign in'}</span>
                <span aria-hidden="true">▼</span>
              </button>

              {isAccountMenuOpen && (
                <div className="account-dropdown">
                  {isSignedIn ? (
                    <>
                      <div className="account-dropdown-profile">
                        <img
                          className="account-dropdown-avatar"
                          src={accountAvatar}
                          alt=""
                        />
                        <div>
                          <strong>{accountName}</strong>
                          {userProfile?.email && (
                            <span>{userProfile.email}</span>
                          )}
                        </div>
                      </div>
                      <dl className="account-details">
                        {userProfile?.phoneNumber && (
                          <div>
                            <dt>Phone</dt>
                            <dd>{userProfile.phoneNumber}</dd>
                          </div>
                        )}
                        {userProfile?.role && (
                          <div>
                            <dt>Account type</dt>
                            <dd>{userProfile.role}</dd>
                          </div>
                        )}
                      </dl>
                      <button
                        className="account-logout"
                        type="button"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <div className="account-signin">
                      <p>Sign in to view your account details.</p>
                      <Link to="/login" onClick={() => setIsAccountMenuOpen(false)}>
                        Sign in
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="search-content">
          <div className="search-left">

            {/* Search bar */}
            <div
              className="search-area"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setShowSuggestions(false)
                  setActiveSuggestion(-1)
                }
              }}
            >
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by location, neighborhood, or property name..."
                  value={searchQuery}
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions && suggestions.length > 0}
                  aria-controls="rent-search-suggestions"
                  aria-activedescendant={
                    activeSuggestion >= 0
                      ? `rent-search-suggestion-${activeSuggestion}`
                      : undefined
                  }
                  onChange={(event) => {
                    setSearchQuery(event.target.value)
                    setShowSuggestions(true)
                    setActiveSuggestion(-1)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(event) => {
                    if (!showSuggestions || suggestions.length === 0) {
                      if (event.key === 'Escape') setShowSuggestions(false)
                      return
                    }

                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      setActiveSuggestion(current =>
                        (current + 1) % suggestions.length
                      )
                    } else if (event.key === 'ArrowUp') {
                      event.preventDefault()
                      setActiveSuggestion(current =>
                        current <= 0 ? suggestions.length - 1 : current - 1
                      )
                    } else if (
                      event.key === 'Enter' &&
                      activeSuggestion >= 0
                    ) {
                      event.preventDefault()
                      selectSuggestion(suggestions[activeSuggestion])
                    } else if (event.key === 'Escape') {
                      setShowSuggestions(false)
                      setActiveSuggestion(-1)
                    }
                  }}
                />
                <button
                  className="search-location"
                  type="button"
                  onClick={useCurrentLocation}
                  disabled={isLocating}
                  aria-pressed={Boolean(userLocation)}
                >
                  <span>📍</span>
                  <span>
                    {isLocating
                      ? 'Finding you…'
                      : userLocation
                        ? 'Update location'
                        : 'Use my location'}
                  </span>
                </button>
                <button
                  className="search-btn"
                  type="button"
                  aria-label="Clear search and location"
                  title="Clear search and location"
                  onClick={clearSearchAndLocation}
                >
                  ✕
                </button>
              </div>

              {(locationError || userLocation) && (
                <p className="location-message" role="status">
                  {locationError ||
                    `Showing homes within ${nearbyRadiusKm} km. Distances are estimates.`}
                </p>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <ul
                  id="rent-search-suggestions"
                  className="search-suggestions"
                  role="listbox"
                >
                  {suggestions.map((suggestion, index) => (
                    <li key={suggestion} role="presentation">
                      <button
                        id={`rent-search-suggestion-${index}`}
                        type="button"
                        role="option"
                        aria-selected={activeSuggestion === index}
                        className={
                          activeSuggestion === index ? 'active' : ''
                        }
                        onMouseEnter={() => setActiveSuggestion(index)}
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quick filter tabs */}
            <div className="filter-tabs">
              {quickTabs.map(tab => (
                <button
                  key={tab}
                  className={`filter-tab ${filters.type === tab ? 'active' : ''}`}
                  onClick={() => updateFilter('type', tab)}
                >
                  {tab}
                </button>
              ))}

              {/* Advanced filters toggle */}
              <button
                className="filter-advanced-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                ⚙️ Filters {showFilters ? '▲' : '▼'}
              </button>

              {/* Sort */}
              <select
                className="filter-sort"
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
              >
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
                {userLocation && <option>Nearest First</option>}
              </select>
            </div>

            {/* Advanced filters panel */}
            {showFilters && (
              <div className="advanced-filters">

                {/* Row 1 - Type and Region */}
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Property Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => updateFilter('type', e.target.value)}
                    >
                      <option value="All">All Types</option>
                      {propertyTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Region</label>
                    <select
                      value={filters.region}
                      onChange={(e) => updateFilter('region', e.target.value)}
                    >
                      <option value="">All Regions</option>
                      {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Rental Period</label>
                    <select
                      value={filters.rentalPeriod}
                      onChange={(e) => updateFilter('rentalPeriod', e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                {/* Row 2 - Price range */}
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Min Price (GH₵)</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                    />
                  </div>

                  <div className="filter-group">
                    <label>Max Price (GH₵)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    />
                  </div>

                  <div className="filter-group">
                    <label>Bedrooms</label>
                    <select
                      value={filters.beds}
                      onChange={(e) => updateFilter('beds', e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Bathrooms</label>
                    <select
                      value={filters.baths}
                      onChange={(e) => updateFilter('baths', e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                </div>

                {/* Row 3 - Furnishing and Availability */}
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Furnishing</label>
                    <select
                      value={filters.furnishing}
                      onChange={(e) => updateFilter('furnishing', e.target.value)}
                    >
                      <option value="">Any</option>
                      <option>Furnished</option>
                      <option>Unfurnished</option>
                      <option>Semi-Furnished</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Availability</label>
                    <select
                      value={filters.availability}
                      onChange={(e) => updateFilter('availability', e.target.value)}
                    >
                      <option value="">Any</option>
                      <option>Available Now</option>
                      <option>Available Soon</option>
                    </select>
                  </div>
                </div>

                {/* Row 4 - Amenities */}
                <div className="filter-group">
                  <label>Amenities</label>
                  <div className="amenities-grid">
                    {['Wi-Fi', 'Parking', 'Security', 'Air Conditioning',
                      'Generator', 'Water', 'DSTV', 'Pool'].map(amenity => (
                      <button
                        key={amenity}
                        className={`amenity-btn ${filters.amenities.includes(amenity) ? 'active' : ''}`}
                        onClick={() => toggleAmenity(amenity)}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset button */}
                <button className="reset-filters-btn" onClick={resetFilters}>
                  ✕ Reset All Filters
                </button>

              </div>
            )}

            {/* Results header */}
            <div className="results-header">
              <h2>Available Rentals</h2>
              <p>
                Showing {filteredProperties.length} results
                {userLocation && ` within ${nearbyRadiusKm} km`}
              </p>
            </div>

            {/* Property list */}
            <div className="properties-list">
              {filteredProperties.length === 0 ? (
                <div className="no-results">
                  <p>😕 No properties found.</p>
                  <button onClick={resetFilters}>Clear Filters</button>
                </div>
              ) : (
                filteredProperties.map(property => {
                  const distance = userLocation
                    ? getDistanceInKm(property, userLocation)
                    : undefined

                  return (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      userLocation={userLocation}
                      distanceKm={distance}
                    />
                  )
                })
              )}
            </div>

          </div>

          {/* Map */}
          <div className={`search-map${isMapExpanded ? ' search-map--expanded' : ' search-map--minimized'}`}>
            <div className="search-map-header">
              <h3>Map View</h3>
              <button
                className="map-size-toggle"
                type="button"
                aria-label={isMapExpanded ? 'Minimize map' : 'Expand map'}
                aria-pressed={isMapExpanded}
                title={isMapExpanded ? 'Minimize map' : 'Expand map'}
                onClick={() => setIsMapExpanded(expanded => !expanded)}
              >
                {isMapExpanded ? '−' : '+'}
              </button>
            </div>
            <PropertyMap properties={filteredProperties} />
          </div>

        </div>

      </div>
    </DashboardLayout>
  )
}

export default SearchPage