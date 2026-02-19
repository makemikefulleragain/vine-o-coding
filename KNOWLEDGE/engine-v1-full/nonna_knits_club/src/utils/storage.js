const POSTS_KEY = 'nkc_posts'
const USER_REACTIONS_KEY = 'nkc_user_reactions'
const FEEDBACK_KEY = 'nkc_feedback'
const VIEW_PREF_KEY = 'nkc_view_pref'

export function getPosts() {
  try {
    const raw = localStorage.getItem(POSTS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function savePosts(posts) {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  } catch (e) {
    console.warn('Could not save to localStorage:', e)
  }
}

export function generateId() {
  return 'post-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8)
}

export function getUserReactions() {
  try {
    const raw = localStorage.getItem(USER_REACTIONS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveUserReactions(reactions) {
  try {
    localStorage.setItem(USER_REACTIONS_KEY, JSON.stringify(reactions))
  } catch (e) {
    console.warn('Could not save reactions to localStorage:', e)
  }
}

export function getFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveFeedback(feedbackList) {
  try {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackList))
  } catch (e) {
    console.warn('Could not save feedback to localStorage:', e)
  }
}

export function getViewPref() {
  try {
    return localStorage.getItem(VIEW_PREF_KEY) || 'list'
  } catch {
    return 'list'
  }
}

export function saveViewPref(pref) {
  try {
    localStorage.setItem(VIEW_PREF_KEY, pref)
  } catch (e) {
    console.warn('Could not save view pref to localStorage:', e)
  }
}

const SAVED_KEY = 'nkc_saved'

export function getSavedPostIds() {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveSavedPostIds(ids) {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids))
  } catch (e) {
    console.warn('Could not save bookmarks to localStorage:', e)
  }
}

export function toggleSavedPost(postId) {
  const ids = getSavedPostIds()
  const idx = ids.indexOf(postId)
  if (idx === -1) {
    ids.push(postId)
  } else {
    ids.splice(idx, 1)
  }
  saveSavedPostIds(ids)
  return ids
}
