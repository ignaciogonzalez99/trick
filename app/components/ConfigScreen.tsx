"use client";

import { Dispatch, useState } from "react";
import { Action, GameState } from "../hooks/useGameState";

type Props = {
  state: GameState;
  dispatch: Dispatch<Action>;
};

const PRESET_LIMITS = [20, 30, 40, 50, 60];

export default function ConfigScreen({ state, dispatch }: Props) {
  const { jugadores, limitePuntos } = state.config;
  const [customValue, setCustomValue] = useState("");

  const handlePresetClick = (value: number) => {
    setCustomValue("");
    dispatch({ type: "SET_LIMITE", payload: value });
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setCustomValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) {
      dispatch({ type: "SET_LIMITE", payload: parsed });
    }
  };

  const isCustomActive =
    customValue !== "" && !PRESET_LIMITS.includes(limitePuntos);

  return (
    <div
      className="animate-fade-in flex flex-col h-full w-full max-w-md mx-auto px-5 py-6 gap-5"
      style={{
        background: "linear-gradient(180deg, #122A1C 0%, #1A5C2A 50%, #2A7A3A 100%)",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col items-center gap-1"
        style={{ paddingTop: "max(8px, env(safe-area-inset-top, 0px))" }}
      >
        <span className="text-[#E8C52A] font-black text-2xl tracking-[0.3em] uppercase">
          CONFIGURAR
        </span>
        <div className="h-[1.5px] w-20 rounded-full bg-[#E8C52A] opacity-30" />
      </div>

      {/* Jugadores */}
      <div className="flex flex-col gap-3">
        <span className="text-[#E8C52A] text-xs font-bold tracking-[0.25em] uppercase opacity-70">
          Jugadores
        </span>
        <div className="flex gap-4">
          {([4, 6] as const).map((n) => (
            <button
              key={n}
              onClick={() => dispatch({ type: "SET_JUGADORES", payload: n })}
              className="flex-1 py-3 rounded-xl font-black text-2xl transition-all duration-150"
              style={{
                border: jugadores === n ? "2px solid #E8C52A" : "2px solid rgba(232,197,42,0.2)",
                background: jugadores === n ? "rgba(232,197,42,0.15)" : "rgba(255,255,255,0.04)",
                color: jugadores === n ? "#E8C52A" : "rgba(232,197,42,0.4)",
                boxShadow: jugadores === n ? "0 0 16px rgba(232,197,42,0.2)" : "none",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Puntaje Máximo */}
      <div className="flex flex-col gap-3">
        <span className="text-[#E8C52A] text-xs font-bold tracking-[0.25em] uppercase opacity-70">
          Puntaje Máximo
        </span>
        <div className="flex gap-2 flex-wrap">
          {PRESET_LIMITS.map((n) => {
            const active = limitePuntos === n && !isCustomActive;
            return (
              <button
                key={n}
                onClick={() => handlePresetClick(n)}
                className="flex-1 min-w-[44px] py-2.5 rounded-xl font-black text-lg transition-all duration-150"
                style={{
                  border: active ? "2px solid #E8C52A" : "2px solid rgba(232,197,42,0.2)",
                  background: active ? "rgba(232,197,42,0.15)" : "rgba(255,255,255,0.04)",
                  color: active ? "#E8C52A" : "rgba(232,197,42,0.4)",
                  boxShadow: active ? "0 0 16px rgba(232,197,42,0.2)" : "none",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>

        {/* Custom input */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[#E8C52A] text-[10px] font-semibold tracking-[0.2em] uppercase opacity-50">
            Personalizado
          </span>
          <input
            type="number"
            min="1"
            placeholder="Ej: 45"
            value={customValue}
            onChange={handleCustomChange}
            className="w-full py-3 px-4 rounded-xl font-bold text-xl text-center outline-none transition-all duration-150"
            style={{
              background: isCustomActive ? "rgba(232,197,42,0.15)" : "rgba(255,255,255,0.06)",
              border: isCustomActive ? "2px solid #E8C52A" : "2px solid rgba(232,197,42,0.2)",
              color: isCustomActive ? "#E8C52A" : "rgba(232,197,42,0.5)",
            }}
          />
        </div>
      </div>

      {/* Meta preview */}
      <div className="flex items-center justify-center gap-2 opacity-60">
        <div className="h-px flex-1 bg-[#E8C52A] opacity-20" />
        <span className="text-[#E8C52A] text-xs tracking-widest uppercase font-semibold">
          Malas hasta {Math.floor(state.config.meta)} · Buenas desde {Math.ceil(state.config.meta)}
        </span>
        <div className="h-px flex-1 bg-[#E8C52A] opacity-20" />
      </div>

      {/* JUGAR button */}
      <div className="mt-auto">
        <button
          onClick={() => dispatch({ type: "START_GAME" })}
          className="w-full py-4 rounded-2xl font-black text-xl tracking-[0.25em] uppercase transition-all duration-150 active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #C8A800 0%, #E8C52A 50%, #F2D64A 100%)",
            color: "#1A5C2A",
            boxShadow: "0 6px 24px rgba(232,197,42,0.35)",
          }}
        >
          JUGAR
        </button>
      </div>
    </div>
  );
}
