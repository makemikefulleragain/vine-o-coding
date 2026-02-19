import { useState } from 'react'
import GroupCard from '../components/GroupCard'
import groupsData from '../data/groups.json'

const TYPE_FILTERS = [
  { value: 'all', label: 'All Groups' },
  { value: 'online', label: 'Online' },
  { value: 'in-person', label: 'In Person' },
]

function Groups() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = groupsData.filter((group) => {
    const matchesType = typeFilter === 'all' || group.type === typeFilter
    const matchesSearch =
      search === '' ||
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.description.toLowerCase().includes(search.toLowerCase()) ||
      group.location.toLowerCase().includes(search.toLowerCase()) ||
      group.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-rose-deep mb-2">Find Groups</h1>
        <p className="text-gray-600">
          Knitting circles, crochet clubs, and craft meetups — online and in person. 
          Find your people.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="group-search" className="sr-only">Search groups</label>
          <input
            id="group-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
            placeholder="Search by name, location, or tag..."
          />
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter by type">
          {TYPE_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTypeFilter(value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                typeFilter === value
                  ? 'bg-sage text-white font-medium'
                  : 'bg-white text-gray-600 border border-earth-light/30 hover:bg-sage-light/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card text-center text-gray-500 py-8">
            <p>No groups match your search. Try different keywords?</p>
          </div>
        ) : (
          filtered.map((group) => <GroupCard key={group.id} group={group} />)
        )}
      </div>

      <div className="card bg-sage-light/20 border-sage/20 text-center">
        <p className="text-gray-700">
          <strong>Know a group that should be listed here?</strong>
        </p>
        <p className="text-gray-600 text-sm mt-1">
          This directory is curated and growing. Drop a note on the{' '}
          <a href="/board" className="text-sage-deep underline hover:text-sage">
            Community Board
          </a>{' '}
          and we'll add it!
        </p>
      </div>
    </div>
  )
}

export default Groups
