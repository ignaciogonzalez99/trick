"use client";

import { Dispatch, useState } from "react";
import { Action, GameState, Team } from "../hooks/useGameState";
import { TallyGroup } from "./TallyGroup";

type Props = {
  state: GameState;
  dispatch: Dispatch<Action>;
};

function TallySection({
  points,
  color,
  dim,
}: {
  points: number;
  color: string;
  dim?: boolean;
}) {
  const fullGroups = Math.floor(points / 5);
  const remainder = points % 5;

  return (
    <div className="relative p-2 pb-1" style={{ flex: "1 0 50%" }}>
      {/* Tally grid */}
      <div
        className="grid grid-cols-2 gap-1 pt-2"
        style={{ color, opacity: dim ? 0.35 : 1 }}
      >
        {Array.from({ length: fullGroups }, (_, i) => (
          <TallyGroup key={i} count={5} />
        ))}
        {remainder > 0 && <TallyGroup count={remainder} />}
      </div>
    </div>
  );
}

function TeamColumn({
  team,
  puntos,
  meta,
  limite,
  dispatch,
}: {
  team: Team;
  puntos: number;
  meta: number;
  limite: number;
  dispatch: Dispatch<Action>;
}) {
  const metaFloor = Math.floor(meta);
  const esGanador = puntos >= limite;
  const esBuenas = puntos >= metaFloor;

  const malasPoints = Math.min(puntos, metaFloor);
  const buenasPoints = Math.max(0, puntos - metaFloor);

  return (
    <button
      className="relative flex flex-col flex-1 min-h-full cursor-pointer select-none"
      onClick={() => !esGanador && dispatch({ type: "ADD_POINT", team })}
      aria-label={`Sumar punto a ${team}`}
    >
      {/* MALAS section (top half) */}
      <TallySection
        points={malasPoints}
        color="rgba(255,255,255,0.9)"
        dim={esBuenas && !esGanador}
      />

      {/* BUENAS section (bottom half) */}
      <TallySection
        points={buenasPoints}
        color={esGanador ? "#4ade80" : "#E8C52A"}
      />
    </button>
  );
}

export default function AnotadorScreen({ state, dispatch }: Props) {
  const { puntos, config } = state;
  const [showHelp, setShowHelp] = useState(false);

  const metaFloor = Math.floor(config.meta);
  const nosotrosGana = puntos.nosotros >= config.limitePuntos;
  const ellosGanan = puntos.ellos >= config.limitePuntos;

  function statusLabel(pts: number, gana: boolean, team: "nos" | "ell") {
    if (gana) return team === "nos" ? "¡GANAMOS!" : "¡GANARON!";
    if (pts >= metaFloor) return "BUENAS";
    return "MALAS";
  }

  function statusColor(pts: number, gana: boolean) {
    if (gana) return "#4ade80";
    if (pts >= metaFloor) return "#E8C52A";
    return "rgba(255,255,255,0.35)";
  }

  return (
    <div
      className="animate-fade-in flex flex-col h-full w-full max-w-md mx-auto relative"
      style={{ background: "linear-gradient(180deg, #0F2A1A 0%, #1A5C2A 100%)" }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <span className="text-[#E8C52A] font-black text-xs tracking-[0.3em] uppercase opacity-60">
          REALENVIDO
        </span>
        <span className="text-[#E8C52A] text-[10px] font-semibold opacity-40 tracking-wider">
          Hasta {config.limitePuntos} · {config.jugadores}J
        </span>
        <div className="flex items-center gap-3">
          {/* Help button */}
          <button
            onClick={() => setShowHelp(true)}
            className="w-7 h-7 rounded-full flex items-center justify-center font-black text-sm transition-all active:scale-90"
            style={{
              background: "rgba(232,197,42,0.15)",
              border: "1.5px solid rgba(232,197,42,0.35)",
              color: "#E8C52A",
            }}
            aria-label="Ayuda"
          >
            ?
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="text-[10px] font-bold tracking-widest uppercase opacity-35 hover:opacity-60 transition-opacity"
            style={{ color: "#E8C52A" }}
          >
            RESET
          </button>
        </div>
      </div>

      {/* ── Team name headers ── */}
      <div className="flex shrink-0 px-1 pb-1">
        {/* NOSOTROS header */}
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <span className="text-white font-black text-sm tracking-[0.15em] uppercase">
            NOSOTROS
          </span>
          <span
            className="text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: statusColor(puntos.nosotros, nosotrosGana) }}
          >
            {statusLabel(puntos.nosotros, nosotrosGana, "nos")}
          </span>
        </div>
        {/* Spacer for vertical divider width */}
        <div className="w-[1.5px]" />
        {/* ELLOS header */}
        <div className="flex-1 flex flex-col items-center gap-0.5">
          <span className="text-white font-black text-sm tracking-[0.15em] uppercase">
            ELLOS
          </span>
          <span
            className="text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: statusColor(puntos.ellos, ellosGanan) }}
          >
            {statusLabel(puntos.ellos, ellosGanan, "ell")}
          </span>
        </div>
      </div>

      {/* ── Thin separator under headers ── */}
      <div className="mx-3 h-px shrink-0" style={{ background: "rgba(232,197,42,0.12)" }} />

      {/* ── Main 4-quadrant scoring area ── */}
      <div className="flex-1 min-h-0 relative">

        {/* Horizontal divider: anchored to viewport midpoint, no scroll */}
        <div
          className="absolute left-0 right-0 pointer-events-none z-20"
          style={{
            top: "50%",
            height: "1.5px",
            transform: "translateY(-50%)",
            background: "linear-gradient(to right, rgba(232,197,42,0.08), rgba(232,197,42,0.35) 20%, rgba(232,197,42,0.35) 80%, rgba(232,197,42,0.08))",
          }}
        />

        {/* Single scroll container for all tally content */}
        <div className="absolute inset-0 flex items-start overflow-y-auto no-scrollbar">

          {/* NOSOTROS column */}
          <TeamColumn
            team="nosotros"
            puntos={puntos.nosotros}
            meta={config.meta}
            limite={config.limitePuntos}
            dispatch={dispatch}
          />

          {/* Vertical divider */}
          <div
            className="shrink-0 my-2 z-20"
            style={{
              width: "1.5px",
              alignSelf: "stretch",
              background: "linear-gradient(to bottom, rgba(232,197,42,0.08), rgba(232,197,42,0.3) 20%, rgba(232,197,42,0.3) 80%, rgba(232,197,42,0.08))",
            }}
          />

          {/* ELLOS column */}
          <TeamColumn
            team="ellos"
            puntos={puntos.ellos}
            meta={config.meta}
            limite={config.limitePuntos}
            dispatch={dispatch}
          />
        </div>
      </div>

      {/* ── Bottom controls: score + subtract ── */}
      <div className="flex shrink-0 py-3 px-2" style={{ borderTop: "1px solid rgba(232,197,42,0.1)" }}>
        {/* NOSOTROS controls */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <span
            className="font-black text-2xl tabular-nums w-10 text-center"
            style={{ color: statusColor(puntos.nosotros, nosotrosGana) }}
          >
            {puntos.nosotros}
          </span>
          <button
            onClick={() => dispatch({ type: "SUBTRACT_POINT", team: "nosotros" })}
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl transition-all active:scale-90"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
            }}
            aria-label="Restar punto a Nosotros"
          >
            −
          </button>
        </div>

        <div className="w-[1.5px]" />

        {/* ELLOS controls */}
        <div className="flex-1 flex items-center justify-center gap-3">
          <span
            className="font-black text-2xl tabular-nums w-10 text-center"
            style={{ color: statusColor(puntos.ellos, ellosGanan) }}
          >
            {puntos.ellos}
          </span>
          <button
            onClick={() => dispatch({ type: "SUBTRACT_POINT", team: "ellos" })}
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xl transition-all active:scale-90"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)",
            }}
            aria-label="Restar punto a Ellos"
          >
            −
          </button>
        </div>
      </div>

      {/* ── Help overlay ── */}
      {showHelp && (
        <div
          className="absolute inset-0 flex flex-col z-50 animate-fade-in"
          style={{ background: "rgba(10,28,18,0.97)" }}
        >
          <div className="flex items-center justify-between px-5 pt-6 pb-4">
            <span className="text-[#E8C52A] font-black text-base tracking-[0.2em] uppercase">
              Ayuda Rápida
            </span>
            <button
              onClick={() => setShowHelp(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold transition-all active:scale-90"
              style={{
                background: "rgba(232,197,42,0.12)",
                color: "#E8C52A",
                border: "1px solid rgba(232,197,42,0.25)",
              }}
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
          <div className="h-px mx-5" style={{ background: "rgba(232,197,42,0.15)" }} />

          <div className="flex-1 flex flex-col gap-6 px-6 pt-6 overflow-y-auto pb-8">
            <HelpSection title="La cancha">
              <p className="text-white text-sm leading-relaxed opacity-70">
                La pantalla está dividida en <strong className="text-white opacity-90">4 cuadrantes</strong>: cada equipo tiene su columna, y dentro de cada columna hay dos zonas — <strong className="text-white opacity-90">Malas</strong> (arriba) y <strong className="text-[#E8C52A]">Buenas</strong> (abajo).
              </p>
            </HelpSection>

            <HelpSection title="Malas y Buenas">
              <p className="text-white text-sm leading-relaxed opacity-70">
                Los primeros <strong className="text-white opacity-90">{metaFloor} puntos</strong> son Malas y se llenan en la mitad superior. Al llegar al punto {metaFloor + 1}, los palitos empiezan a aparecer en <strong className="text-[#E8C52A]">Buenas</strong>.
              </p>
              <p className="text-white text-sm leading-relaxed opacity-70 pt-1">
                Cada equipo progresa de forma independiente — uno puede estar en Buenas mientras el otro sigue en Malas.
              </p>
            </HelpSection>

            <HelpSection title="Cómo anotar">
              <p className="text-white text-sm leading-relaxed opacity-70">
                Tocá en cualquier parte de la columna de tu equipo para sumar 1 punto. Usá el botón <strong className="text-white opacity-90">−</strong> en la barra inferior para corregir.
              </p>
            </HelpSection>

            <HelpSection title="Los palitos">
              <div className="flex items-center gap-4 pt-1">
                <div className="text-[#E8C52A] w-16">
                  <TallyGroup count={5} className="w-full h-auto" />
                </div>
                <span className="text-white text-sm opacity-60">= 5 puntos</span>
              </div>
            </HelpSection>
          </div>
        </div>
      )}
    </div>
  );
}

function HelpSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[#E8C52A] text-xs font-bold tracking-[0.2em] uppercase opacity-80">
        {title}
      </span>
      {children}
    </div>
  );
}
