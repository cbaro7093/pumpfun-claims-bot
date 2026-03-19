import { useEffect } from 'react'

const BASE_TITLE = 'PumpKit'

export function useSEO(title: string, description?: string) {
  useEffect(() => {
    document.title = title === BASE_TITLE ? title : `${title} — ${BASE_TITLE}`

    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }

    return () => {
      document.title = `${BASE_TITLE} — Open-Source PumpFun Monitoring Framework for Solana`
    }
  }, [title, description])
}
