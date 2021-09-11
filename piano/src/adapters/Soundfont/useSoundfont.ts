import { useRef, useState } from 'react'
import { InstrumentName, Player } from 'soundfont-player'
import { AudioNodesRegistry } from '../../domain/audio'
import { MidiValue } from '../../domain/note'
import { DEFAULT_INSTRUMENT } from '../../domain/sound'
import { Optional } from '../../domain/types'
import SoundFontPlayer from 'soundfont-player'

interface Settings {
  AudioContext: AudioContextType
}

interface Adapted {
  loading: boolean
  current: Optional<InstrumentName>

  load(instrument?: InstrumentName): Promise<void>
  play(note: MidiValue): Promise<void>
  stop(note: MidiValue): Promise<void>
}

export const useSoundfont = ({ AudioContext }: Settings): Adapted => {
  let activeNodes: AudioNodesRegistry = {}
  const [current, setCurrent] = useState<Optional<InstrumentName>>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [player, setPlayer] = useState<Optional<Player>>(null)
  const audio = useRef(new AudioContext())

  const load = async (instrument: InstrumentName = DEFAULT_INSTRUMENT) => {
    setLoading(true)
    const player = await SoundFontPlayer.instrument(audio.current, instrument)
    setLoading(false)
    setCurrent(instrument)
    setPlayer(player)
  }

  const play = async (note: MidiValue) => {
    await resume()
    if (!player) return

    const node = player.play(note.toString())
    activeNodes = { ...activeNodes, [note]: node }
  }

  const stop = async (note: MidiValue) => {
    await resume()
    if (!activeNodes[note]) return

    activeNodes[note]!.stop()
    activeNodes = { ...activeNodes, [note]: null }
  }

  const resume = async () => {
    return audio.current.state === 'suspended'
      ? await audio.current.resume()
      : Promise.resolve()
  }

  return {
    current,
    loading,
    play,
    stop,
    load,
  }
}
