import { useRef } from 'react'

// Hook checks whether a component has been rendered only once.
// https://usehooks-ts.com/react-hook/use-is-first-render
const useIsFirstRender = (): boolean => {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
    return true
  }

  return isFirst.current
}

export default useIsFirstRender
