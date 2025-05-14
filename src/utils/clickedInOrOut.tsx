import { useRef, useEffect, RefObject } from 'react'

/**
 * Hook para detectar cliques dentro ou fora de um elemento.
 * @param inside Função executada se clicar dentro do elemento.
 * @param out Função executada se clicar fora do elemento.
 * @returns Ref a ser anexada ao elemento a ser monitorado.
 */
function clickedInOrOut(
  inside?: () => void,
  out?: () => void
): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return

      if (ref.current.contains(event.target as Node)) {
        inside?.()
      } else {
        out?.()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [inside, out])

  return ref
}

export default clickedInOrOut
