import { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import { getPosts, getUserReactions, saveUserReactions, savePosts, getSavedPostIds, toggleSavedPost } from '../utils/storage'

function Saved() {
  const [allPosts, setAllPosts] = useState([])
  const [savedIds, setSavedIds] = useState([])
  const [userReactions, setUserReactions] = useState({})

  useEffect(() => {
    setAllPosts(getPosts() || [])
    setSavedIds(getSavedPostIds())
    setUserReactions(getUserReactions())
  }, [])

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

    const updatedPosts = allPosts.map((p) => {
      if (p.id !== postId) return p
      const reactions = { ...(p.reactions || { heart: 0, clap: 0, yarn: 0, star: 0 }) }
      reactions[reactionKey] = Math.max(0, (reactions[reactionKey] || 0) + (alreadyReacted ? -1 : 1))
      return { ...p, reactions }
    })
    setAllPosts(updatedPosts)
    savePosts(updatedPosts)
  }

  function handleToggleSave(postId) {
    const newIds = toggleSavedPost(postId)
    setSavedIds([...newIds])
  }

  const savedPosts = allPosts.filter((p) => savedIds.includes(p.id))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl text-rose-deep mb-2">My Saved Posts</h1>
        <p className="text-gray-600">
          Posts you've pinned to come back to later. Only you can see this list.
        </p>
      </div>

      {savedPosts.length === 0 ? (
        <div className="card text-center py-12">
          <span className="text-4xl block mb-3">📌</span>
          <p className="font-heading text-lg text-gray-700 mb-2">Nothing saved yet</p>
          <p className="text-gray-500 max-w-md mx-auto">
            When you see a post you like on the Community Board, tap the <strong>Save</strong> button to pin it here. 
            You can find it again whenever you want.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{savedPosts.length} saved {savedPosts.length === 1 ? 'post' : 'posts'}</p>
          {savedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              userReactions={userReactions[post.id] || []}
              onReact={handleReact}
              isSaved={true}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved
