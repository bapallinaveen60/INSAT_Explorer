import React from 'react';
import { PersonaType } from '../../types/course';

interface CharacterDialogueProps {
  speaker: PersonaType;
  text: string;
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({ speaker, text }) => {
  if (speaker === 'ray') {
    return (
      <div className="flex items-start gap-3 my-3 p-3.5 bg-[#dceeff] border-2 border-[#2a2825] rounded-xl shadow-[3px_3px_0_rgba(42,40,37,0.12)]">
        {/* Ray Avatar - Cute Photon Packet with Eyes & Smile */}
        <div className="shrink-0 w-11 h-11 bg-[#bde0fe] border-2 border-[#2a2825] rounded-full flex items-center justify-center relative overflow-hidden">
          <svg viewBox="0 0 40 40" className="w-8 h-8 select-none">
            {/* Photon droplet body */}
            <path
              d="M 20 6 C 20 6 9 20 9 27 A 11 11 0 0 0 31 27 C 31 20 20 6 20 6 Z"
              fill="#ffdf70"
              stroke="#2a2825"
              strokeWidth="2"
            />
            {/* Cute Eyes */}
            <circle cx="16" cy="24" r="1.8" fill="#2a2825" />
            <circle cx="24" cy="24" r="1.8" fill="#2a2825" />
            {/* Smile */}
            <path
              d="M 16 28 Q 20 32 24 28"
              fill="none"
              stroke="#2a2825"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0 text-[#1d1c19] text-sm leading-relaxed">
          <div className="font-bold text-xs uppercase tracking-wide text-[#0d6fd4] mb-0.5">
            Ray — A 10.8 µm Photon
          </div>
          <p className="font-medium text-[#2a2825]">{text}</p>
        </div>
      </div>
    );
  }

  if (speaker === 'insat') {
    return (
      <div className="flex items-start gap-3 my-3 p-3.5 bg-[#e2f3e7] border-2 border-[#2a2825] rounded-xl shadow-[3px_3px_0_rgba(42,40,37,0.12)]">
        {/* INSAT Avatar - Cute Satellite with Solar Panels & Smiling Face */}
        <div className="shrink-0 w-11 h-11 bg-[#c8e6c9] border-2 border-[#2a2825] rounded-xl flex items-center justify-center relative">
          <svg viewBox="0 0 48 36" className="w-9 h-7 select-none">
            {/* Left Solar Panel */}
            <rect x="2" y="10" width="10" height="16" rx="1.5" fill="#81c784" stroke="#2a2825" strokeWidth="1.8" />
            <line x1="7" y1="10" x2="7" y2="26" stroke="#2a2825" strokeWidth="1.2" />
            <line x1="2" y1="18" x2="12" y2="18" stroke="#2a2825" strokeWidth="1.2" />

            {/* Connecting Arm */}
            <line x1="12" y1="18" x2="16" y2="18" stroke="#2a2825" strokeWidth="2" />

            {/* Satellite Body */}
            <rect x="16" y="8" width="16" height="20" rx="3" fill="#ffffff" stroke="#2a2825" strokeWidth="2" />
            {/* Cute Eyes */}
            <circle cx="21" cy="15" r="1.8" fill="#2a2825" />
            <circle cx="27" cy="15" r="1.8" fill="#2a2825" />
            {/* Smile */}
            <path d="M 21 21 Q 24 25 27 21" fill="none" stroke="#2a2825" strokeWidth="1.8" strokeLinecap="round" />

            {/* Top Dish / Antenna */}
            <path d="M 24 8 L 24 4" stroke="#2a2825" strokeWidth="1.8" />
            <circle cx="24" cy="3" r="2" fill="#ef4444" stroke="#2a2825" strokeWidth="1.5" />

            {/* Connecting Arm Right */}
            <line x1="32" y1="18" x2="36" y2="18" stroke="#2a2825" strokeWidth="2" />

            {/* Right Solar Panel */}
            <rect x="36" y="10" width="10" height="16" rx="1.5" fill="#81c784" stroke="#2a2825" strokeWidth="1.8" />
            <line x1="41" y1="10" x2="41" y2="26" stroke="#2a2825" strokeWidth="1.2" />
            <line x1="36" y1="18" x2="46" y2="18" stroke="#2a2825" strokeWidth="1.2" />
          </svg>
        </div>

        <div className="flex-1 min-w-0 text-[#1d1c19] text-sm leading-relaxed">
          <div className="font-bold text-xs uppercase tracking-wide text-[#1b6b3c] mb-0.5">
            INSAT-3D — 35,786 km in Geostationary Orbit
          </div>
          <p className="font-medium text-[#2a2825]">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-2 p-3 bg-[#eff1f4] border-2 border-[#2a2825] rounded-xl text-xs text-[#2a2825] font-mono">
      {text}
    </div>
  );
};
