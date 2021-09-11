import clsx from 'clsx'
import { FunctionComponent, ReactEventHandler } from 'react'
import { NoteType } from '../../domain/note'

interface KeyProps {
  type: NoteType
  label: string
  disabled?: boolean
  onDown: ReactEventHandler<HTMLButtonElement>
  onUp: ReactEventHandler<HTMLButtonElement>
}

export const Key: FunctionComponent<KeyProps> = (props) => {
  const { type, label, disabled, onDown, onUp } = props

  return (
    <button
      className={clsx(`key key--${type}`)}
      type="button"
      disabled={disabled}
      onMouseDown={onDown}
      onMouseUp={onUp}
    >
      {label}
    </button>
  )
}
