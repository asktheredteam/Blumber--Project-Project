function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search by location, neighborhood, or property name..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div className="search-location">
        <span>📍</span>
        <span>Accra, GH</span>
        <span>▼</span>
      </div>
      <button className="search-btn" type="button" aria-label="Search">
        🔍
      </button>
    </div>
  )
}

export default SearchBar
