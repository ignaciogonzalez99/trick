"use client";

import { useState } from "react";
import { SUITS, NUMBERS, SUIT_ICONS, Suit } from "./CardsHierarchy";

type CardData = {
  suit: Suit;
  number: number;
};

type Result = {
  type: "flor" | "envido" | "error";
  puntos: number;
  explanation: string;
};

function calculateEnvidoOrFlor(muestraCard: CardData, hand: CardData[]): Result {
  let p2 = muestraCard.number === 2 ? 12 : 2;
  let p4 = muestraCard.number === 4 ? 12 : 4;
  let p5 = muestraCard.number === 5 ? 12 : 5;
  let p11 = muestraCard.number === 11 ? 12 : 11;
  let p10 = muestraCard.number === 10 ? 12 : 10;

  const pieceValuesForFlor: Record<number, number> = {
    [p2]: 10,
    [p4]: 9,
    [p5]: 8,
    [p11]: 7,
    [p10]: 7,
  };

  const pieceValuesForEnvido: Record<number, number> = {
    [p2]: 30,
    [p4]: 29,
    [p5]: 28,
    [p11]: 27,
    [p10]: 27,
  };

  function isPiece(card: CardData) {
    if (card.suit !== muestraCard.suit) return false;
    return pieceValuesForFlor.hasOwnProperty(card.number);
  }

  function getCardValue(card: CardData) {
    if ([10, 11, 12].includes(card.number)) return 0;
    return card.number;
  }

  function getCardName(card: CardData) {
    return `${card.number} ${SUIT_ICONS[card.suit]}`;
  }

  const piecesInHand = hand.filter(isPiece);
  const normalCards = hand.filter((c) => !isPiece(c));

  // Check for FLOR
  let hasFlor = false;
  if (piecesInHand.length === 3) hasFlor = true;
  else if (piecesInHand.length === 2) hasFlor = true;
  else if (
    piecesInHand.length === 1 &&
    normalCards.length === 2 &&
    normalCards[0].suit === normalCards[1].suit
  )
    hasFlor = true;
  else if (
    piecesInHand.length === 0 &&
    normalCards.length === 3 &&
    normalCards[0].suit === normalCards[1].suit &&
    normalCards[1].suit === normalCards[2].suit
  )
    hasFlor = true;

  if (hasFlor) {
    let puntos = 20;
    let explanationParts = [];
    if (piecesInHand.length === 3) explanationParts.push("3 piezas");
    else if (piecesInHand.length === 2) explanationParts.push("2 piezas");
    else if (piecesInHand.length === 1) explanationParts.push("1 pieza y 2 del mismo palo");
    else explanationParts.push("3 del mismo palo");

    let explanationStr = `${explanationParts[0]}: Base (20)`;
    for (const p of piecesInHand) {
      const val = pieceValuesForFlor[p.number];
      puntos += val;
      explanationStr += ` + ${getCardName(p)} (${val})`;
    }
    for (const c of normalCards) {
      const val = getCardValue(c);
      puntos += val;
      explanationStr += ` + ${getCardName(c)} (${val})`;
    }
    return { type: "flor", puntos, explanation: explanationStr };
  }

  // ENVIDO
  if (piecesInHand.length === 1) {
    const p = piecesInHand[0];
    let maxNormal = 0;
    let maxCard = null;
    if (normalCards.length > 0) {
      for (const c of normalCards) {
        if (getCardValue(c) >= maxNormal) {
          maxNormal = getCardValue(c);
          maxCard = c;
        }
      }
    }
    const envidoPoints = pieceValuesForEnvido[p.number] + maxNormal;
    let explanationStr = `1 pieza: ${getCardName(p)} (${pieceValuesForEnvido[p.number]})`;
    if (maxCard) {
      explanationStr += ` + más alta ${getCardName(maxCard)} (${maxNormal})`;
    }
    return { type: "envido", puntos: envidoPoints, explanation: explanationStr };
  }

  // No pieces, look for 2 cards of same suit
  if (normalCards.length === 3) {
    const [c1, c2, c3] = normalCards;

    const explain2 = (c_a: CardData, c_b: CardData) => {
      const v1 = getCardValue(c_a);
      const v2 = getCardValue(c_b);
      return `2 del mismo palo: Base (20) + ${getCardName(c_a)} (${v1}) + ${getCardName(c_b)} (${v2})`;
    };

    if (c1.suit === c2.suit) {
      return { type: "envido", puntos: 20 + getCardValue(c1) + getCardValue(c2), explanation: explain2(c1, c2) };
    } else if (c1.suit === c3.suit) {
      return { type: "envido", puntos: 20 + getCardValue(c1) + getCardValue(c3), explanation: explain2(c1, c3) };
    } else if (c2.suit === c3.suit) {
      return { type: "envido", puntos: 20 + getCardValue(c2) + getCardValue(c3), explanation: explain2(c2, c3) };
    } else {
      // 3 different suits
      let maxNormal = 0;
      let maxCard = c1;
      for (const c of normalCards) {
        if (getCardValue(c) >= maxNormal) {
          maxNormal = getCardValue(c);
          maxCard = c;
        }
      }
      return { type: "envido", puntos: maxNormal, explanation: `3 palos distintos: Solo la más alta ${getCardName(maxCard)} (${maxNormal})` };
    }
  }

  return { type: "error", puntos: 0, explanation: "" };
}

export default function EnvidoCalculator() {
  const [muestra, setMuestra] = useState<CardData>({ suit: "copa", number: 4 });
  const [hand, setHand] = useState<CardData[]>([
    { suit: "oro", number: 1 },
    { suit: "copa", number: 7 },
    { suit: "espada", number: 12 },
  ]);

  // "muestra", 0, 1, 2
  const [activeTab, setActiveTab] = useState<"muestra" | 0 | 1 | 2>("muestra");

  const result = calculateEnvidoOrFlor(muestra, hand);

  const handleSuitChange = (suit: Suit) => {
    if (activeTab === "muestra") setMuestra({ ...muestra, suit });
    else {
      const newHand = [...hand];
      newHand[activeTab] = { ...newHand[activeTab], suit };
      setHand(newHand);
    }
  };

  const handleNumberChange = (number: number) => {
    if (activeTab === "muestra") setMuestra({ ...muestra, number });
    else {
      const newHand = [...hand];
      newHand[activeTab] = { ...newHand[activeTab], number };
      setHand(newHand);
    }
  };

  const activeCard = activeTab === "muestra" ? muestra : hand[activeTab];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-6">
      {/* Visualización de las Cartas */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-[#E8C52A] text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
            Muestra
          </span>
          <button
            onClick={() => setActiveTab("muestra")}
            className={`w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === "muestra"
                ? "bg-[#E8C52A] text-[#0A2812] shadow-[0_0_15px_rgba(232,197,42,0.4)] scale-110 z-10"
                : "bg-black/30 text-white border border-white/10 hover:bg-black/50"
            }`}
          >
            <span className="font-black text-xl">{muestra.number}</span>
            <span className="text-2xl">{SUIT_ICONS[muestra.suit]}</span>
          </button>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <span className="text-[#E8C52A] text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
            Tus Cartas
          </span>
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((idx) => {
              const isActive = activeTab === idx;
              const card = hand[idx];
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx as 0 | 1 | 2)}
                  className={`w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                    isActive
                      ? "bg-[#E8C52A] text-[#0A2812] shadow-[0_0_15px_rgba(232,197,42,0.4)] scale-110 z-10"
                      : "bg-black/30 text-white border border-white/10 hover:bg-black/50"
                  }`}
                >
                  <span className="font-black text-xl">{card.number}</span>
                  <span className="text-2xl">{SUIT_ICONS[card.suit]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selector Activo */}
      <div className="bg-[#1A5C2A]/20 p-4 rounded-xl border border-[#E8C52A]/20 mb-6 shrink-0">
        <span className="block text-white text-xs font-bold tracking-[0.1em] uppercase mb-3 text-center opacity-90">
          Editando: {activeTab === "muestra" ? "Muestra" : `Carta ${activeTab + 1}`}
        </span>

        {/* Suits */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {SUITS.map((suit) => (
            <button
              key={suit}
              onClick={() => handleSuitChange(suit)}
              className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                activeCard.suit === suit
                  ? "bg-[#E8C52A] shadow-[0_0_10px_rgba(232,197,42,0.4)]"
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
              onClick={() => handleNumberChange(num)}
              className={`w-7 h-7 rounded-md text-sm font-bold transition-all ${
                activeCard.number === num
                  ? "bg-[#E8C52A] text-[#0A2812] shadow-[0_0_10px_rgba(232,197,42,0.4)]"
                  : "bg-black/20 text-[#E8C52A]/60 hover:bg-black/40"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Resultado */}
      <div
        className={`mt-auto shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-colors ${
          result.type === "flor"
            ? "bg-[#4ade80]/10 border-[#4ade80]/50"
            : "bg-[#E8C52A]/10 border-[#E8C52A]/30"
        }`}
      >
        <span
          className={`text-sm font-black tracking-[0.2em] uppercase mb-1 ${
            result.type === "flor" ? "text-[#4ade80]" : "text-[#E8C52A]"
          }`}
        >
          {result.type === "flor" ? "¡Tienes Flor!" : "Envido"}
        </span>
        <span
          className={`text-4xl font-black mb-2 ${
            result.type === "flor" ? "text-[#4ade80]" : "text-[#E8C52A]"
          }`}
        >
          {result.puntos} <span className="text-lg opacity-70">pts</span>
        </span>
        <span className="text-[10px] text-white/60 text-center font-medium max-w-[250px] leading-relaxed">
          {result.explanation}
        </span>
      </div>
    </div>
  );
}
