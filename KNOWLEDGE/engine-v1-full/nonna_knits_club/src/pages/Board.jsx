import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import GalleryCard from '../components/GalleryCard'
import { seedPosts } from '../data/seedPosts'
import { getPosts, savePosts, generateId, getUserReactions, saveUserReactions, getViewPref, saveViewPref, getSavedPostIds, toggleSavedPost } from '../utils/storage'

const FILTERS = [
  { value: 'all', label: 'All Posts' },
  { value: 'show-and-tell', label: 'Show & Tell' },
  { value: 'question', label: 'Questions' },
  { value: 'chat', label: 'Chat' },
]

function Board() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('all')
  const [userReactions, setUserReactions] = useState({})
  const [viewMode, setViewMode] = useState('list')
  const [expandedPost, setExpandedPost] = useState(null)
  const [savedIds, setSavedIds] = useState([])

  useEffect(() => {
    const stored = getPosts()
    if (stored && stored.length > 0) {
      setPosts(stored)
    } else {
      setPosts(seedPosts)
      savePosts(seedPosts)
    }
    setUserReactions(getUserReactions())
    setViewMode(getViewPref())
    setSavedIds(getSavedPostIds())
  }, [])

  function handleNewPost(data) {
    const newPost = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      reactions: { heart: 0, clap: 0, yarn: 0, star: 0 },
    }
    const updated = [newPost, ...posts]
    setPosts(updated)
    savePosts(updated)
  }

  function handleReact(postId, reactionKey) {
    const postReactions = userReactions[postId] || []
    const alreadyReacted = postReactions.includes(reactionKey)

    const newUserReactions = { ...userReactions }
    if (alreadyReacted) {
      newUserReactions[postId] = postReactions.filter((r) => r !== reactionKey)
    } else {
      newUserReactions[postId] = [...postReactions, reactionKey]
    }
    setUserReactions(newUserReactions)
    saveUserReactions(newUserReactions)

    const updatedPosts = posts.map((p) => {
      if (p.id !== postId) return p
      const reactions = { ...(p.reactions || { heart: 0, clap: 0, yarn: 0, star: 0 }) }
      reactions[reactionKey] = Math.max(0, (reactions[reactionKey] || 0) + (alreadyReacted ? -1 : 1))
      return { ...p, reactions }
    })
    setPosts(updatedPosts)
    savePosts(updatedPosts)
  }

  function handleToggleSave(postId) {
    const newIds = toggleSavedPost(postId)
    setSavedIds([...newIds])
  }

  function switchView(mode) {
    setViewMode(mode)
    saveViewPref(mode)
    setExpandedPost(null)
  }

  const filtered = filter === 'all'
    ? posts
    : posts.filter((p) => p.category === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-rose-deep mb-2">Community Board</h1>
        <p className="text-gray-600">
          Share what you've made, ask a question, or just say hello. This is your space.
        </p>
      </div>

      <PostForm onSubmit={handleNewPost} />

      {/* Filter + View toggle row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter posts">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === value
                  ? 'bg-sage text-white font-medium'
                  : 'bg-white text-gray-600 border border-earth-light/30 hover:bg-sage-light/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* View toggle — obvious with text labels */}
        <div className="flex gap-1.5" role="group" aria-label="Switch view">
          <button
            onClick={() => switchView('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-sage text-white shadow-sm'
                : 'bg-white text-gray-500 border border-earth-light/30 hover:bg-sage-light/20 hover:text-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            List
          </button>
          <button
            onClick={() => switchView('gallery')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'gallery'
                ? 'bg-sage text-white shadow-sm'
                : 'bg-white text-gray-500 border border-earth-light/30 hover:bg-sage-light/20 hover:text-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            Gallery
          </button>
        </div>
      </div>

      {/* Expanded post overlay (for gallery click) */}
      {expandedPost && (
        <div className="relative">
          <button
            onClick={() => setExpandedPost(null)}
            className="text-sm text-sage-deep hover:text-sage mb-2 flex items-center gap-1.5 font-medium px-3 py-1.5 rounded-lg hover:bg-sage-light/20 transition-colors"
          >
            &larr; Back to gallery
          </button>
          <PostCard
            post={expandedPost}
            userReactions={userReactions[expandedPost.id] || []}
            onReact={handleReact}
            isSaved={savedIds.includes(expandedPost.id)}
            onToggleSave={handleToggleSave}
          />
        </div>
      )}

      {/* Posts */}
      {!expandedPost && (
        viewMode === 'gallery' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <div className="col-span-full card text-center text-gray-500 py-8">
                <p>No posts yet in this category. Be the first to share something!</p>
              </div>
            ) : (
              filtered.map((post) => (
                <GalleryCard
                  key={post.id}
                  post={post}
                  onClick={(p) => setExpandedPost(p)}
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="card text-center text-gray-500 py-8">
                <p>No posts yet in this category. Be the first to share something!</p>
              </div>
            ) : (
              filtered.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userReactions={userReactions[post.id] || []}
                  onReact={handleReact}
                  isSaved={savedIds.includes(post.id)}
                  onToggleSave={handleToggleSave}
                />
              ))
            )}
          </div>
        )
      )}
    </div>
  )
}

export default Board
