import { useRef } from 'react'
import { accessContext } from '../../domain/audio'
import { Optional } from '../../domain/types'

export  const useAudioContext = (): Optional<AudioContextType> => {
  const AudioCtx = useRef(accessContext())
  return AudioCtx.current
}
