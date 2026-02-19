import { useState } from 'react'

function PostForm({ onSubmit }) {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('show-and-tell')
  const [imageUrl, setImageUrl] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!author.trim() || !title.trim() || !body.trim()) return

    onSubmit({
      author: author.trim(),
      title: title.trim(),
      body: body.trim(),
      category,
      imageUrl: imageUrl.trim(),
    })

    setAuthor('')
    setTitle('')
    setBody('')
    setCategory('show-and-tell')
    setImageUrl('')
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary w-full sm:w-auto"
      >
        + Share Something
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="font-heading text-lg text-gray-800">Share with the Circle</h3>

      <div>
        <label htmlFor="post-author" className="block text-sm font-medium text-gray-600 mb-1">
          Your Name
        </label>
        <input
          id="post-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input-field"
          placeholder="What should we call you?"
          required
        />
      </div>

      <div>
        <label htmlFor="post-category" className="block text-sm font-medium text-gray-600 mb-1">
          What kind of post?
        </label>
        <select
          id="post-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        >
          <option value="show-and-tell">Show &amp; Tell — share something you made</option>
          <option value="question">Question — ask for help or advice</option>
          <option value="chat">Chat — general natter</option>
        </select>
      </div>

      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-gray-600 mb-1">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          placeholder="Give your post a title"
          required
        />
      </div>

      <div>
        <label htmlFor="post-body" className="block text-sm font-medium text-gray-600 mb-1">
          Your message
        </label>
        <textarea
          id="post-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="input-field min-h-[120px] resize-y"
          placeholder="Tell us about it..."
          required
        />
      </div>

      <div>
        <label htmlFor="post-image" className="block text-sm font-medium text-gray-600 mb-1">
          Image link (optional)
        </label>
        <input
          id="post-image"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="input-field"
          placeholder="Paste a link to a photo (e.g. from Instagram or Imgur)"
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="btn-primary">
          Post to the Board
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-5 py-2.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default PostForm
