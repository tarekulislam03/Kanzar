'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const lfoRef = useRef<OscillatorNode | null>(null)

  const stopAudio = useCallback(() => {
    if (!audioCtxRef.current || !masterGainRef.current) return

    const now = audioCtxRef.current.currentTime
    masterGainRef.current.gain.cancelScheduledValues(now)
    masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, now)
    masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

    setTimeout(() => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop()
          osc.disconnect()
        } catch {
          // ignore
        }
      })
      oscillatorsRef.current = []

      if (lfoRef.current) {
        try {
          lfoRef.current.stop()
          lfoRef.current.disconnect()
        } catch {
          // ignore
        }
        lfoRef.current = null
      }

      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.suspend()
      }
      setIsPlaying(false)
    }, 1250)
  }, [])

  const startAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) {
        setIsSupported(false)
        return
      }

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }

      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      // Master Gain
      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime)
      masterGainRef.current = masterGain

      // Warm Lowpass Filter (gives deep, velvet luxury texture)
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(680, ctx.currentTime)
      filter.Q.setValueAtTime(2.0, ctx.currentTime)

      // Stereo panner or subtle depth
      masterGain.connect(filter)
      filter.connect(ctx.destination)

      // Pentatonic warm golden drone frequencies (F#3, C#4, F#4, G#4, C#5)
      const freqs = [185.0, 277.18, 369.99, 415.3, 554.37]
      const oscs: OscillatorNode[] = []

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime)

        // Subtle harmonic detuning for rich cinematic shimmer
        const detune = (idx - 2) * 4
        osc.detune.setValueAtTime(detune, ctx.currentTime)

        // Individual voice volume
        const voiceVol = 0.045 / (idx + 1)
        oscGain.gain.setValueAtTime(voiceVol, ctx.currentTime)

        osc.connect(oscGain)
        oscGain.connect(masterGain)
        osc.start()
        oscs.push(osc)
      })

      oscillatorsRef.current = oscs

      // Gentle LFO for breathing movement
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(0.18, ctx.currentTime) // slow breath
      lfoGain.gain.setValueAtTime(140, ctx.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)
      lfo.start()
      lfoRef.current = lfo

      // Smooth cinematic fade-in
      const now = ctx.currentTime
      masterGain.gain.cancelScheduledValues(now)
      masterGain.gain.setValueAtTime(0.0001, now)
      masterGain.gain.exponentialRampToValueAtTime(0.35, now + 2.0)

      setIsPlaying(true)
    } catch {
      setIsSupported(false)
    }
  }, [])

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  if (!isSupported) return null

  return (
    <button
      onClick={toggleAudio}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 cursor-pointer ${
        isPlaying
          ? 'border-[#C48793] bg-[#2A161D]/80 text-[#FAF5F0] shadow-[0_0_15px_rgba(196,135,147,0.35)]'
          : 'border-[#C48793]/30 bg-black/40 text-[#D99AA6]/80 hover:border-[#C48793]/60 hover:text-[#FAF5F0]'
      }`}
      title={isPlaying ? 'Mute cinematic ambient audio' : 'Play cinematic ambient audio'}
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-[2px] h-3">
            <span className="w-[2px] bg-[#C48793] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-2.5" />
            <span className="w-[2px] bg-[#E5B2BD] rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3.5" />
            <span className="w-[2px] bg-[#FAF5F0] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2" />
          </div>
          <Volume2 className="w-3.5 h-3.5 text-[#C48793]" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Sound On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#D99AA6]/70" />
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Sound</span>
        </>
      )}
    </button>
  )
}
