function GroupCard({ group }) {
  return (
    <a
      href={group.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card block group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg text-gray-800 group-hover:text-sage-deep transition-colors">
            {group.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {group.location}
          </p>
        </div>
        <span
          className={`badge ${
            group.type === 'in-person'
              ? 'bg-amber-warm/30 text-amber-deep'
              : 'bg-sage-light/50 text-sage-deep'
          }`}
        >
          {group.type === 'in-person' ? 'In Person' : 'Online'}
        </span>
      </div>
      <p className="text-gray-700 mt-2 leading-relaxed">
        {group.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {group.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-cream text-gray-500 border border-earth-light/30"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

export default GroupCard
