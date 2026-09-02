'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Waves, Flame, CloudRain, Wind, Sparkles } from 'lucide-react';

interface AmbientSoundscapeProps {
  propertyCategory?: string;
  city?: string;
}

export function AmbientSoundscape({
  propertyCategory = 'beachfront',
  city = 'Goa',
}: AmbientSoundscapeProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const tracks = [
    {
      name: 'Arabian Sea Waves',
      icon: <Waves className="h-4 w-4 text-sky-500" />,
      desc: 'Gentle rhythmic coastal tide and sea breeze',
      tag: 'Ocean Calm',
    },
    {
      name: 'Pine Fireplace',
      icon: <Flame className="h-4 w-4 text-amber-500" />,
      desc: 'Crackling cedar logs and cozy fireplace embers',
      tag: 'Warmth',
    },
    {
      name: 'Zen Garden Rain',
      icon: <CloudRain className="h-4 w-4 text-emerald-500" />,
      desc: 'Soft rainfall on bamboo eaves and stone lanterns',
      tag: 'Meditation',
    },
    {
      name: 'Alpine High Wind',
      icon: <Wind className="h-4 w-4 text-purple-500" />,
      desc: 'Crisp mountain breeze through snow-covered peaks',
      tag: 'Fresh Air',
    },
  ];

  // Synthesize realistic ambient white noise / wave sweep with Web Audio API
  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Create pink noise buffer for realistic soothing waves
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
        gainNodeRef.current = gainNode;
        setIsPlaying(true);
      } catch {
        setIsPlaying(true);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const activeTrack = tracks[activeTrackIndex];

  return (
    <div className="rounded-3xl border border-gray-200 bg-linear-to-br from-gray-900 to-black text-white p-5 sm:p-6 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-rose-400">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">Spatial Ambient Soundscape</h4>
            <p className="text-[11px] text-gray-400">Immerse your senses with live ambient sound</p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center gap-2 py-1.5 px-3.5 rounded-full text-xs font-bold transition-all ${
            isPlaying
              ? 'bg-[#FF385C] text-white shadow-lg animate-pulse'
              : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="h-3.5 w-3.5" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              <span>Listen</span>
            </>
          )}
        </button>
      </div>

      {/* Animated Equalizer Wave */}
      <div className="h-10 w-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-1 px-4 overflow-hidden">
        {[40, 70, 90, 30, 60, 100, 45, 80, 65, 95, 35, 75, 50, 85, 40].map((h, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full bg-linear-to-t from-[#FF385C] to-amber-300 transition-all duration-300 ${
              isPlaying ? 'animate-pulse' : 'opacity-30'
            }`}
            style={{
              height: isPlaying ? `${Math.max(15, (h * (i % 3 + 1)) % 100)}%` : '20%',
              animationDelay: `${i * 70}ms`,
            }}
          />
        ))}
      </div>

      {/* Track Switcher Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {tracks.map((t, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTrackIndex(idx)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              activeTrackIndex === idx
                ? 'bg-white/15 border-rose-400 text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              {t.icon}
              <span className="font-bold text-[11px] text-white truncate">{t.name}</span>
            </div>
            <span className="text-[10px] text-gray-400 block truncate">{t.tag}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
