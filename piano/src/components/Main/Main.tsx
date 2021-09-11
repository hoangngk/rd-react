import { FunctionComponent } from 'react'
import { useAudioContext } from '../AudioContextProvider/useAudioContext'
import { KeyboardWithInstrument } from '../Keyboard/WithInstrument'
import { NoAudioMessage } from '../NoAudioMessage/NoAudioMessage'

export const Main: FunctionComponent = () => {
  const AudioContext = useAudioContext()

  return !!AudioContext ? <KeyboardWithInstrument /> : <NoAudioMessage />
}
