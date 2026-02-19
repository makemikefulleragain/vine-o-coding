import { useState } from 'react'

const categoryLabels = {
  'show-and-tell': 'Show & Tell',
  'question': 'Question',
  'chat': 'Chat',
}

const categoryClasses = {
  'show-and-tell': 'badge-show',
  'question': 'badge-question',
  'chat': 'badge-chat',
}

const REACTION_TYPES = [
  { key: 'heart', emoji: '❤️', label: 'Love' },
  { key: 'clap', emoji: '👏', label: 'Bravo' },
  { key: 'yarn', emoji: '🧶', label: 'Yarn' },
  { key: 'star', emoji: '⭐', label: 'Star' },
]

function PostCard({ post, userReactions = [], onReact, isSaved = false, onToggleSave }) {
  const [imgError, setImgError] = useState(false)

  const date = new Date(post.createdAt)
  const dateStr = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const reactions = post.reactions || { heart: 0, clap: 0, yarn: 0, star: 0 }

  return (
    <article className="card">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-heading text-lg text-gray-800 leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            by <span className="font-medium text-rose-deep">{post.author}</span> &middot; {dateStr}
          </p>
        </div>
        <span className={categoryClasses[post.category] || 'badge'}>
          {categoryLabels[post.category] || post.category}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {post.body}
      </p>
      {post.imageUrl && !imgError && (
        <div className="mt-3">
          <img
            src={post.imageUrl}
            alt={`Image for "${post.title}"`}
            className="rounded-lg max-h-72 object-cover w-full"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      {post.imageUrl && imgError && (
        <div className="mt-3 rounded-lg bg-sage-light/20 border border-earth-light/20 flex items-center justify-center py-8">
          <div className="text-center text-gray-400">
            <span className="text-3xl block mb-1">🧶</span>
            <span className="text-sm">Image couldn't be loaded</span>
          </div>
        </div>
      )}

      {/* Reactions + Save row */}
      <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-earth-light/20">
        <div className="flex flex-wrap gap-1.5">
          {REACTION_TYPES.map(({ key, emoji, label }) => {
            const isActive = userReactions.includes(key)
            const count = reactions[key] || 0
            return (
              <button
                key={key}
                onClick={() => onReact && onReact(post.id, key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-rose-warm/25 ring-2 ring-rose-warm/50 shadow-sm'
                    : 'bg-cream/60 hover:bg-cream border border-earth-light/20'
                }`}
                aria-label={`${label} (${count})`}
                title={label}
              >
                <span className="text-lg leading-none">{emoji}</span>
                <span className={`text-xs font-medium ${isActive ? 'text-rose-deep' : 'text-gray-500'}`}>
                  {count > 0 ? count : label}
                </span>
              </button>
            )
          })}
        </div>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(post.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-150 whitespace-nowrap ${
              isSaved
                ? 'bg-amber-warm/25 ring-2 ring-amber-warm/50 text-amber-deep font-medium'
                : 'bg-cream/60 hover:bg-cream border border-earth-light/20 text-gray-500'
            }`}
            aria-label={isSaved ? 'Saved — click to unsave' : 'Save for later'}
            title={isSaved ? 'Saved — click to unsave' : 'Save for later'}
          >
            <span className="text-lg leading-none">{isSaved ? '🔖' : '📌'}</span>
            <span className="hidden sm:inline text-xs">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        )}
      </div>
    </article>
  )
}

export default PostCard
