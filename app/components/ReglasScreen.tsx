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

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 no-scrollbar">
        <div className="flex flex-col gap-6 text-[#1A5C2A]">
          <div>
            <h1 className="font-black text-xl mb-2 uppercase tracking-wide">Reglamento del Truco Uruguayo</h1>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              El Truco Uruguayo es una variante del juego de cartas de la baraja española que se distingue principalmente por el uso de la &quot;Muestra&quot; y las &quot;Piezas&quot;, lo que añade una capa estratégica única.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-[#1A5C2A] text-[#F2D64A] w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Las Cartas y el Reparto
            </h2>
            <ul className="text-sm space-y-2 opacity-90 font-medium pl-2">
              <li><strong className="font-bold">Baraja:</strong> Se utiliza la baraja española de 40 cartas.</li>
              <li><strong className="font-bold">Jugadores:</strong> Se puede jugar en parejas (2 vs 2) o individualmente (1 vs 1).</li>
              <li><strong className="font-bold">Reparto:</strong> Cada jugador recibe 3 cartas por mano.</li>
              <li><strong className="font-bold">La Muestra:</strong> Al terminar de repartir, se coloca una carta boca arriba en la mesa. El palo de esta carta determina cuál es el palo de la &quot;Muestra&quot; para esa mano.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-[#1A5C2A] text-[#F2D64A] w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Las Piezas
            </h2>
            <p className="text-sm opacity-90 font-medium mb-2 pl-2">
              Las Piezas son las cartas más valiosas del juego. Pertenecen siempre al palo de la muestra y siguen este orden de jerarquía (de mayor a menor):
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 opacity-90 font-medium pl-4 mb-2">
              <li>2 (de la muestra)</li>
              <li>4 (de la muestra)</li>
              <li>5 (de la muestra)</li>
              <li>Caballo (11 de la muestra)</li>
              <li>Sota (10 de la muestra)</li>
            </ul>
            <p className="text-sm opacity-90 font-medium pl-2">
              <strong className="font-bold">Excepción (El Rey):</strong> Si la carta que quedó como &quot;Muestra&quot; en la mesa es una de las piezas arriba mencionadas, el Rey (12) de ese mismo palo toma su lugar y se convierte en esa pieza.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-[#1A5C2A] text-[#F2D64A] w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              El Truco
            </h2>
            <p className="text-sm opacity-90 font-medium mb-3 pl-2">
              El objetivo es ganar 2 de las 3 &quot;bazas&quot; (rondas de cartas lanzadas). Quien gana el truco sin apuestas suma 1 punto.
            </p>
            
            <h3 className="font-bold text-sm mb-2 pl-2">Jerarquía de cartas para el Truco (de mayor a menor):</h3>
            <div className="bg-[#1A5C2A]/10 rounded-lg p-3 mb-3 text-sm opacity-90 font-medium">
              <ol className="list-decimal list-inside space-y-1">
                <li>Piezas (en el orden: 2, 4, 5, Caballo, Sota)</li>
                <li>As de Espadas (el &quot;Macho&quot;)</li>
                <li>As de Bastos (la &quot;Hembra&quot;)</li>
                <li>7 de Espadas</li>
                <li>7 de Oros</li>
                <li>3 (todos los palos)</li>
                <li>2 (de palos que no son muestra)</li>
                <li>Ases Falsos (Copa y Oro)</li>
                <li>Reyes (salvo que sea pieza)</li>
                <li>Caballos (salvo que sea pieza)</li>
                <li>Sotas (salvo que sea pieza)</li>
                <li>7 Falsos (Copa y Bastos)</li>
                <li>6</li>
                <li>5 (salvo que sea pieza)</li>
                <li>4 (salvo que sea pieza)</li>
              </ol>
            </div>

            <h3 className="font-bold text-sm mb-2 pl-2">Apuestas del Truco:</h3>
            <ul className="text-sm space-y-1 opacity-90 font-medium pl-2 mb-3">
              <li><strong className="font-bold">Truco:</strong> Vale 2 puntos.</li>
              <li><strong className="font-bold">Retruco:</strong> Vale 3 puntos.</li>
              <li><strong className="font-bold">Vale 4:</strong> Vale 4 puntos.</li>
            </ul>

            <p className="text-sm opacity-90 font-medium pl-2 italic">
              <strong className="font-bold not-italic">Nota sobre el empate (Parda):</strong> Si se empata una baza, gana el truco quien haya ganado la baza anterior. Si la primera es parda, gana quien gane la segunda. Si las tres son pardas, gana el jugador que es &quot;mano&quot; (el que empezó).
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-[#1A5C2A] text-[#F2D64A] w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
              El Envido
            </h2>
            <p className="text-sm opacity-90 font-medium mb-3 pl-2">
              Se juega opcionalmente antes de tirar la primera carta. Gana quien tenga el mayor puntaje de envido.
            </p>

            <h3 className="font-bold text-sm mb-2 pl-2">Cálculo de puntos:</h3>
            <ul className="text-sm space-y-2 opacity-90 font-medium pl-2 mb-3">
              <li>
                <strong className="font-bold block">Con una Pieza:</strong> Se suma el valor de la pieza + el número de la carta más alta de las otras dos.
                <ul className="list-disc list-inside pl-4 mt-1 space-y-0.5 text-xs">
                  <li>El 2 de muestra vale 30.</li>
                  <li>El 4 de muestra vale 29.</li>
                  <li>El 5 de muestra vale 28.</li>
                  <li>El Caballo de muestra vale 27.</li>
                  <li>La Sota de muestra vale 27.</li>
                </ul>
              </li>
              <li><strong className="font-bold">Con dos cartas del mismo palo (sin piezas):</strong> Se suma el valor de las cartas + 20 puntos.</li>
              <li><strong className="font-bold">Cartas de distinto palo:</strong> Vale el número de la carta más alta.</li>
              <li><strong className="font-bold">Figuras:</strong> Para el envido, las figuras (10, 11, 12) valen 0.</li>
            </ul>

            <div className="bg-[#1A5C2A]/10 rounded-lg p-3 mb-3 text-sm opacity-90 font-medium">
              <strong className="font-bold block mb-1">Ejemplos:</strong>
              <ul className="list-disc list-inside space-y-1">
                <li>2 de muestra y un As: 30 + 1 = 31 puntos.</li>
                <li>7 y 3 del mismo palo: 7 + 3 + 20 = 30 puntos.</li>
              </ul>
            </div>

            <h3 className="font-bold text-sm mb-2 pl-2">Apuestas del Envido:</h3>
            <ul className="text-sm space-y-1 opacity-90 font-medium pl-2">
              <li><strong className="font-bold">Envido:</strong> Se apuestan 2 puntos (o más si se revoca).</li>
              <li><strong className="font-bold">Envido la falta:</strong> Se apuesta lo que le falta para ganar el &quot;chico&quot; (30 puntos) al que va ganando.</li>
              <li className="italic mt-1">Si no se acepta la apuesta, el que cantó suma 1 punto (o los puntos ya comprometidos).</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="bg-[#1A5C2A] text-[#F2D64A] w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
              La Flor
            </h2>
            <p className="text-sm opacity-90 font-medium mb-2 pl-2">
              Un jugador tiene Flor si posee una de estas combinaciones:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 opacity-90 font-medium pl-4 mb-3">
              <li>3 piezas.</li>
              <li>2 piezas y cualquier otra carta.</li>
              <li>1 pieza y 2 cartas del mismo palo.</li>
              <li>3 cartas del mismo palo.</li>
            </ul>

            <h3 className="font-bold text-sm mb-2 pl-2">Reglas de la Flor:</h3>
            <ul className="text-sm space-y-1 opacity-90 font-medium pl-2 mb-3">
              <li><strong className="font-bold">Puntos:</strong> Cantar Flor otorga 3 puntos.</li>
              <li><strong className="font-bold">Prioridad:</strong> Si alguien canta Flor, el envido queda anulado.</li>
              <li><strong className="font-bold">Contra-Flor:</strong> Si otro jugador también tiene Flor, puede decir &quot;Con Flor Envido&quot; o &quot;Con Flor Envido la falta&quot; para aumentar la apuesta.</li>
            </ul>

            <h3 className="font-bold text-sm mb-2 pl-2">Valoración en caso de disputa entre Flores:</h3>
            <p className="text-sm opacity-90 font-medium mb-2 pl-2">
              Se suma una base de 20 puntos más el valor de las piezas y cartas:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 opacity-90 font-medium pl-4 mb-3">
              <li>Las piezas en la flor valen: 2=10, 4=9, 5=8, Caballo=7, Sota=7.</li>
              <li>Las cartas comunes suman su valor nominal (figuras valen 0).</li>
            </ul>

            <div className="bg-[#1A5C2A]/10 rounded-lg p-3 text-sm opacity-90 font-medium">
              <strong className="font-bold block mb-1">Ejemplo de Flor:</strong>
              <p>2 de muestra (10) + Sota de muestra (7) + Figura (0) + Base (20) = 37 puntos.</p>
            </div>
          </section>

          {/* Resumen */}
          <section className="mb-4">
            <div className="border-t-2 border-[#1A5C2A]/20 pt-4 mt-2">
              <h2 className="font-black text-lg mb-3 uppercase tracking-wide flex items-center justify-center gap-2">
                <ShieldIcon className="w-5 h-5" />
                Resumen de la Mano
                <ShieldIcon className="w-5 h-5" />
              </h2>
              <ul className="text-sm space-y-2 opacity-90 font-medium pl-2 border-l-2 border-[#1A5C2A]/30 ml-2">
                <li className="pl-2">Se reparten 3 cartas y se da vuelta la Muestra.</li>
                <li className="pl-2">Se disputan los lances de Flor o Envido (opcionalmente, al inicio).</li>
                <li className="pl-2">Se disputa el Truco tirando las cartas en 3 bazas.</li>
                <li className="pl-2">El primero en llegar a 30 puntos gana el chico.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
