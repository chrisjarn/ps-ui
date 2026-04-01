import { useEffect, useRef, useState } from 'react'

interface Bounds {
  width: number
  height: number
}

/**
 * Measure an element's dimensions using ResizeObserver.
 * Used for animating height: auto transitions (Jakub-style dialog height animation).
 *
 * Usage:
 *   const [ref, { height }] = useMeasure()
 *   <motion.div animate={{ height }} transition={spring.gentle} />
 *   <div ref={ref}>{dynamicContent}</div>
 */
export function useMeasure<T extends HTMLElement = HTMLDivElement>(): [
  (node: T | null) => void,
  Bounds,
] {
  const [bounds, setBounds] = useState<Bounds>({ width: 0, height: 0 })
  const observerRef = useRef<ResizeObserver | null>(null)

  const ref = (node: T | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (node) {
      observerRef.current = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect
        setBounds({ width, height })
      })
      observerRef.current.observe(node)
    }
  }

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return [ref, bounds]
}
