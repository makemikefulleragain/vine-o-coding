const categoryLabels = {
  patterns: 'Patterns',
  tutorials: 'Tutorials',
  communities: 'Communities',
  supplies: 'Tools & Supplies',
}

const categoryColors = {
  patterns: 'bg-rose-warm/20 text-rose-deep',
  tutorials: 'bg-sage-light/50 text-sage-deep',
  communities: 'bg-amber-warm/30 text-amber-deep',
  supplies: 'bg-earth-light/50 text-earth',
}

function ResourceCard({ resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block group"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-lg text-gray-800 group-hover:text-sage-deep transition-colors">
          {resource.name}
        </h3>
        <span className={`badge ${categoryColors[resource.category] || ''}`}>
          {categoryLabels[resource.category] || resource.category}
        </span>
      </div>
      <p className="text-gray-700 mt-2 leading-relaxed">
        {resource.description}
      </p>
      <p className="text-sm text-sage mt-2 group-hover:underline">
        Visit &rarr;
      </p>
    </a>
  )
}

export default ResourceCard
