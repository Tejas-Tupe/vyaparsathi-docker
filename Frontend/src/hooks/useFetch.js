// src/hooks/useFetch.js
import { useState, useEffect } from 'react'

/**
 * useFetch - small wrapper to call async function (e.g. API call) and provide loading/error/data
 * @param {Function} asyncFn - function that returns a Promise (eg: () => HomeAPI.getStats())
 * @param {Array} deps - dependency array for useEffect
 */
export default function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    asyncFn()
      .then((res) => {
        if (!mounted) return
        setData(res)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error }
}
