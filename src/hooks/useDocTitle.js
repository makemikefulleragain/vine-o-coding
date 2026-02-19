import { useEffect } from 'react'

const BASE_TITLE = 'Outcome Vine Coding'

export default function useDocTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE
    return () => {
      document.title = BASE_TITLE
    }
  }, [title])
}
