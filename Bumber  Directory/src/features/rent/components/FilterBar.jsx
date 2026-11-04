function FilterBar({ activeFilter, onFilterChange }) {
  const filterTabs = ['All', 'Apartment', 'House', 'Room', 'Shared']

  return (
    <div className="filter-tabs">
      {filterTabs.map((tab) => (
        <button
          key={tab}
          className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
          onClick={() => onFilterChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
      <div className="filter-sort">
        <span>⚙️</span>
        <span>Newest First ▼</span>
      </div>
    </div>
  )
}

export default FilterBar