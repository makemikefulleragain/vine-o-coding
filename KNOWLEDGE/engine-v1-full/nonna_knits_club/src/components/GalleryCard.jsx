import { useState } from 'react'

const categoryLabels = {
  'show-and-tell': 'Show & Tell',
  'question': 'Question',
  'chat': 'Chat',
}

const categoryColors = {
  'show-and-tell': 'bg-amber-warm/40 text-amber-deep',
  'question': 'bg-sage-light/60 text-sage-deep',
  'chat': 'bg-rose-warm/30 text-rose-deep',
}

function GalleryCard({ post, onClick }) {
  const [imgError, setImgError] = useState(false)
  const reactions = post.reactions || { heart: 0, clap: 0, yarn: 0, star: 0 }
  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0)
  const hasImage = post.imageUrl && !imgError

  return (
    <button
      onClick={() => onClick && onClick(post)}
      className="card p-0 overflow-hidden text-left w-full group cursor-pointer"
    >
      {/* Image area */}
      <div className="aspect-[4/3] bg-sage-light/20 relative overflow-hidden">
        {hasImage ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sage-light/30 to-cream">
            <span className="text-4xl">🧶</span>
            <span className="text-xs text-gray-400 px-2 text-center">{post.title.slice(0, 40)}{post.title.length > 40 ? '...' : ''}</span>
          </div>
        )}
        <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${categoryColors[post.category] || 'bg-white/90 text-gray-600'}`}>
          {categoryLabels[post.category] || post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-heading text-sm text-gray-800 leading-snug line-clamp-2 group-hover:text-sage-deep transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">
            by <span className="font-medium text-rose-deep">{post.author}</span>
          </p>
          {totalReactions > 0 && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              ❤️ {totalReactions}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export default GalleryCard
