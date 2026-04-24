"use client";

import { Dispatch } from "react";
import { Action } from "../hooks/useGameState";
import { ShieldIcon } from "./icons";

type Props = {
  dispatch: Dispatch<Action>;
};

export default function ReglasScreen({ dispatch }: Props) {
  return (
    <div
      className="animate-fade-in flex flex-col h-full w-full max-w-md mx-auto"
      style={{
        background: "linear-gradient(155deg, #C8A800 0%, #E8C52A 45%, #F2D64A 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4">
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="flex items-center gap-2 font-bold text-sm tracking-widest uppercase transition-opacity active:opacity-60"
          style={{ color: "#1A5C2A" }}
          aria-label="Volver al inicio"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Volver
        </button>

        <div className="flex items-center gap-2">
          <ShieldIcon className="w-5 h-5 text-[#1A5C2A]" />
          <span className="text-[#1A5C2A] font-black tracking-[0.25em] text-sm uppercase">
            REGLAS
          </span>
        </div>
      </div>

      <div className="h-[1.5px] mx-5 rounded-full bg-[#1A5C2A] opacity-20" />

      {/* Placeholder content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(26,92,42,0.08)",
            border: "2px dashed rgba(26,92,42,0.2)",
          }}
        >
          <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-[#1A5C2A]" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="10" y="6" width="36" height="48" rx="4" fillOpacity="0.1" fill="currentColor" />
            <line x1="10" y1="6" x2="10" y2="54" strokeWidth="5" />
            <line x1="20" y1="18" x2="38" y2="18" />
            <line x1="20" y1="26" x2="38" y2="26" />
            <line x1="20" y1="34" x2="30" y2="34" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span
            className="font-black text-2xl tracking-widest uppercase"
            style={{ color: "#1A5C2A" }}
          >
            Próximamente
          </span>
          <span
            className="text-sm leading-relaxed font-medium opacity-60"
            style={{ color: "#1A5C2A" }}
          >
            Las reglas del Truco estarán disponibles en la próxima versión.
          </span>
        </div>

        <div className="flex items-center gap-3 opacity-30">
          <div className="h-px w-12 bg-[#1A5C2A]" />
          <ShieldIcon className="w-5 h-5 text-[#1A5C2A]" />
          <div className="h-px w-12 bg-[#1A5C2A]" />
        </div>
      </div>
    </div>
  );
}
