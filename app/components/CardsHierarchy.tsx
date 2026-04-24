"use client";

import { useState } from "react";

export const SUITS = ["oro", "copa", "espada", "basto"] as const;
export type Suit = typeof SUITS[number];
export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

export const SUIT_ICONS: Record<Suit, string> = {
  oro: "🪙",
  copa: "🍷",
  espada: "⚔️",
  basto: "🪵",
};

export const SUIT_COLORS: Record<Suit, string> = {
  oro: "#F59E0B",
  copa: "#EF4444",
  espada: "#3B82F6",
  basto: "#22C55E",
};

export type Card = {
  number: number;
  suit: Suit;
  label: string;
  isPiece?: boolean;
  isMata?: boolean;
};

export function getHierarchy(muestraNumber: number, muestraSuit: Suit): Card[][] {
  let p2 = muestraNumber === 2 ? 12 : 2;
  let p4 = muestraNumber === 4 ? 12 : 4;
  let p5 = muestraNumber === 5 ? 12 : 5;
  let p11 = muestraNumber === 11 ? 12 : 11;
  let p10 = muestraNumber === 10 ? 12 : 10;

  const pieces: Card[] = [
    { number: p2, suit: muestraSuit, label: `2 de ${muestraSuit}`, isPiece: true },
    { number: p4, suit: muestraSuit, label: `4 de ${muestraSuit}`, isPiece: true },
    { number: p5, suit: muestraSuit, label: `5 de ${muestraSuit}`, isPiece: true },
    { number: p11, suit: muestraSuit, label: `11 de ${muestraSuit}`, isPiece: true },
    { number: p10, suit: muestraSuit, label: `10 de ${muestraSuit}`, isPiece: true },
  ];

  const pieceIdentifiers = new Set(pieces.map((p) => `${p.number}-${p.suit}`));

  const matas: Card[] = [
    { number: 1, suit: "espada", label: "Macho (1 de espada)", isMata: true },
    { number: 1, suit: "basto", label: "Hembra (1 de basto)", isMata: true },
    { number: 7, suit: "espada", label: "7 de espada", isMata: true },
    { number: 7, suit: "oro", label: "7 de oro", isMata: true },
  ];

  const ordinaryOrder = [3, 2, 1, 12, 11, 10, 7, 6, 5, 4];

  const hierarchy: Card[][] = [];

  for (const p of pieces) hierarchy.push([p]);
  for (const m of matas) hierarchy.push([m]);

  for (const num of ordinaryOrder) {
    const group: Card[] = [];
    for (const suit of SUITS) {
      if (!pieceIdentifiers.has(`${num}-${suit}`)) {
        const isMata = matas.some((m) => m.number === num && m.suit === suit);
        if (!isMata) {
          group.push({ number: num, suit, label: `${num} de ${suit}` });
        }
      }
    }
    if (group.length > 0) hierarchy.push(group);
  }

  return hierarchy;
}

export default function CardsHierarchy() {
  const [muestraSuit, setMuestraSuit] = useState<Suit>("copa");
  const [muestraNumber, setMuestraNumber] = useState<number>(4);

  const hierarchy = getHierarchy(muestraNumber, muestraSuit);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Seleccionar Muestra */}
      <div className="shrink-0 mb-4 bg-[#1A5C2A]/20 p-4 rounded-xl border border-[#E8C52A]/20">
        <span className="block text-[#E8C52A] text-xs font-bold tracking-[0.2em] uppercase mb-3 text-center">
          Muestra Seleccionada
        </span>

        {/* Suits */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {SUITS.map((suit) => (
            <button
              key={suit}
              onClick={() => setMuestraSuit(suit)}
              className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                muestraSuit === suit
                  ? "bg-[#E8C52A] shadow-[0_0_15px_rgba(232,197,42,0.4)] scale-110 z-10"
                  : "bg-black/20 hover:bg-black/40 grayscale opacity-50"
              }`}
            >
              {SUIT_ICONS[suit]}
            </button>
          ))}
        </div>

        {/* Numbers */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {NUMBERS.map((num) => (
            <button
              key={num}
              onClick={() => setMuestraNumber(num)}
              className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                muestraNumber === num
                  ? "bg-[#E8C52A] text-[#0A2812] shadow-[0_0_10px_rgba(232,197,42,0.4)]"
                  : "bg-black/20 text-[#E8C52A]/60 hover:bg-black/40"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Jerarquía */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="flex flex-col gap-2">
          {hierarchy.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex items-center gap-2 bg-[#1A5C2A]/10 p-2 rounded-lg border border-white/5"
            >
              <div className="w-6 shrink-0 text-center text-[#E8C52A]/40 text-xs font-black">
                {groupIndex + 1}
              </div>
              <div className="flex-1 flex flex-wrap gap-2">
                {group.map((card, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium ${
                      card.isPiece
                        ? "bg-[#E8C52A]/20 text-[#E8C52A] border border-[#E8C52A]/30 shadow-[0_0_10px_rgba(232,197,42,0.15)]"
                        : card.isMata
                        ? "bg-white/10 text-white border border-white/20"
                        : "bg-black/20 text-white/70"
                    }`}
                  >
                    <span className="text-[10px]">{SUIT_ICONS[card.suit]}</span>
                    <span>{card.number}</span>
                    {card.isPiece && (
                      <span className="text-[9px] uppercase tracking-wider ml-1 opacity-70">
                        Pieza
                      </span>
                    )}
                    {card.isMata && (
                      <span className="text-[9px] uppercase tracking-wider ml-1 opacity-70">
                        Mata
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
