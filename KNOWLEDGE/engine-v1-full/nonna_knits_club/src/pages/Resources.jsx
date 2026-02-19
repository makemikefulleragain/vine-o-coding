import { useState } from 'react'
import ResourceCard from '../components/ResourceCard'
import resourcesData from '../data/resources.json'

const CATEGORY_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'patterns', label: 'Patterns' },
  { value: 'tutorials', label: 'Tutorials' },
  { value: 'supplies', label: 'Tools & Supplies' },
]

function Resources() {
  const [catFilter, setCatFilter] = useState('all')

  const filtered = catFilter === 'all'
    ? resourcesData
    : resourcesData.filter((r) => r.category === catFilter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-rose-deep mb-2">Resources</h1>
        <p className="text-gray-600">
          Curated links to the best patterns, tutorials, and supplies. No hunting around — 
          we've gathered the good stuff in one place.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter resources">
        {CATEGORY_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setCatFilter(value)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              catFilter === value
                ? 'bg-sage text-white font-medium'
                : 'bg-white text-gray-600 border border-earth-light/30 hover:bg-sage-light/20'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="card text-center text-gray-500 py-8 sm:col-span-2">
            <p>No resources in this category yet.</p>
          </div>
        ) : (
          filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        )}
      </div>

      <div className="card bg-sage-light/20 border-sage/20 text-center">
        <p className="text-gray-700">
          <strong>Found a great resource we should include?</strong>
        </p>
        <p className="text-gray-600 text-sm mt-1">
          Share it on the{' '}
          <a href="/board" className="text-sage-deep underline hover:text-sage">
            Community Board
          </a>{' '}
          and we'll add it to the list!
        </p>
      </div>
    </div>
  )
}

export default Resources
