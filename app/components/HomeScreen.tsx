"use client";

import { RefObject, useState } from "react";
import { ShieldIcon, BookIcon, NotepadIcon } from "./icons";

type Props = {
  yellowPanelRef: RefObject<HTMLDivElement | null>;
  greenPanelRef: RefObject<HTMLDivElement | null>;
  onReglasClick: () => void;
  onAnotadorClick: () => void;
};

export default function HomeScreen({
  yellowPanelRef,
  greenPanelRef,
  onReglasClick,
  onAnotadorClick,
}: Props) {
  const [pressedTop, setPressedTop] = useState(false);
  const [pressedBottom, setPressedBottom] = useState(false);

  return (
    <main className="relative h-full w-full max-w-md mx-auto overflow-hidden">
      {/* ── YELLOW PANEL (top half) — absolutely positioned for GSAP ── */}
      <div
        ref={yellowPanelRef}
        className="absolute top-0 left-0 right-0 z-20"
        style={{ height: "50%" }}
      >
        <button
          className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
          style={{
            background: pressedTop
              ? "linear-gradient(155deg, #B89600 0%, #C8A800 40%, #DDB800 100%)"
              : "linear-gradient(155deg, #C8A800 0%, #E8C52A 45%, #F2D64A 100%)",
          }}
          onPointerDown={() => setPressedTop(true)}
          onPointerUp={() => setPressedTop(false)}
          onPointerLeave={() => setPressedTop(false)}
          onClick={onReglasClick}
          aria-label="Ir a Reglas"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 80px)",
            }}
          />

          {/* App title */}
          <div className="absolute top-5 left-0 right-0 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2.5">
              <ShieldIcon className="w-6 h-6 text-[#1A5C2A]" />
              <span className="text-[#1A5C2A] font-black tracking-[0.28em] text-base uppercase">
                REALENVIDO
              </span>
              <ShieldIcon
                className="w-6 h-6 text-[#1A5C2A]"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
            <div className="h-[1.5px] w-36 rounded-full bg-[#1A5C2A] opacity-25" />
          </div>

          <div className="flex flex-col items-center gap-4 mt-8">
            <div
              className="w-28 h-28 flex items-center justify-center rounded-full"
              style={{
                background: "rgba(26,92,42,0.08)",
                boxShadow: "0 4px 24px rgba(26,92,42,0.12)",
              }}
            >
              <BookIcon className="w-16 h-16 text-[#1A5C2A]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span
                className="text-[#1A5C2A] font-black text-5xl tracking-[0.18em] uppercase"
                style={{ textShadow: "0 2px 10px rgba(26,92,42,0.18)" }}
              >
                REGLAS
              </span>
              <span className="text-[#1A5C2A] text-xs font-semibold opacity-60 tracking-[0.25em] uppercase">
                Aprendé a jugar
              </span>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A5C2A] opacity-15" />
        </button>
      </div>

      {/* ── DIVIDER — sits between the two panels ── */}
      <div
        className="absolute left-0 right-0 z-30 h-[3px] -translate-y-1/2"
        style={{
          top: "50%",
          background: "linear-gradient(to right, #0F3A18, #C8A800, #0F3A18)",
        }}
      />

      {/* ── GREEN PANEL (bottom half) — absolutely positioned for GSAP ── */}
      <div
        ref={greenPanelRef}
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{ height: "50%" }}
      >
        <button
          className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
          style={{
            background: pressedBottom
              ? "linear-gradient(205deg, #0A2812 0%, #163322 50%, #1A5C2A 100%)"
              : "linear-gradient(205deg, #122A1C 0%, #1A5C2A 50%, #2A7A3A 100%)",
          }}
          onPointerDown={() => setPressedBottom(true)}
          onPointerUp={() => setPressedBottom(false)}
          onPointerLeave={() => setPressedBottom(false)}
          onClick={onAnotadorClick}
          aria-label="Ir al Anotador"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 80px)",
            }}
          />

          <div className="flex flex-col items-center gap-4 mb-8">
            <div
              className="w-28 h-28 flex items-center justify-center rounded-full"
              style={{
                background: "rgba(232,197,42,0.1)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              }}
            >
              <NotepadIcon className="w-16 h-16 text-[#E8C52A]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span
                className="text-[#E8C52A] font-black text-5xl tracking-[0.12em] uppercase"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
              >
                ANOTADOR
              </span>
              <span className="text-[#E8C52A] text-xs font-semibold opacity-60 tracking-[0.25em] uppercase">
                Llevá el marcador
              </span>
            </div>
          </div>

          <div className="absolute bottom-5 flex items-center gap-2 opacity-30">
            <div className="h-px w-8 bg-[#E8C52A]" />
            <span className="text-[#E8C52A] text-[9px] tracking-[0.4em] uppercase font-bold">
              RealEnvido
            </span>
            <div className="h-px w-8 bg-[#E8C52A]" />
          </div>

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E8C52A] opacity-15" />
        </button>
      </div>
    </main>
  );
}
