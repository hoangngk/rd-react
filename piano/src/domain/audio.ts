import { Player } from 'soundfont-player'
import { MidiValue } from './note'
import { Optional } from './types'

export function accessContext(): Optional<AudioContextType> {
  return window.AudioContext || window.webkitAudioContext || null
}

export type AudioNodesRegistry = Record<MidiValue, Optional<Player>>