import { FunctionComponent } from 'react'
import { OctavesRange, selectKey } from '../../domain/keyboard'
import { Key } from '../Key/Key'
import './style.css'

export const Keyboard: FunctionComponent = () => {
  const notes: any[] = [];

  return (
    <div className="keyboard">
      {notes.map(({ midi, type, index, octave }) => {
        const label = selectKey(octave as OctavesRange, index)
        return <Key key={midi} type={type} label={label} />
      })}
    </div>
  )
}
