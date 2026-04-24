"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGameState } from "./hooks/useGameState";
import HomeScreen from "./components/HomeScreen";
import ConfigScreen from "./components/ConfigScreen";
import AnotadorScreen from "./components/AnotadorScreen";
import ReglasScreen from "./components/ReglasScreen";

export default function Home() {
  const [state, dispatch] = useGameState();
  const yellowPanelRef = useRef<HTMLDivElement | null>(null);
  const greenPanelRef = useRef<HTMLDivElement | null>(null);

  const handleReglasClick = useCallback(() => {
    if (!yellowPanelRef.current) return;
    gsap.to(yellowPanelRef.current, {
      height: "100%",
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => dispatch({ type: "GO_TO_REGLAS" }),
    });
  }, [dispatch]);

  const handleAnotadorClick = useCallback(() => {
    if (!greenPanelRef.current) return;
    gsap.to(greenPanelRef.current, {
      height: "100%",
      top: 0,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => dispatch({ type: "GO_TO_CONFIG" }),
    });
  }, [dispatch]);

  if (state.screen === "reglas") {
    return <ReglasScreen dispatch={dispatch} />;
  }

  if (state.screen === "config") {
    return <ConfigScreen state={state} dispatch={dispatch} />;
  }

  if (state.screen === "anotador") {
    return <AnotadorScreen state={state} dispatch={dispatch} />;
  }

  return (
    <HomeScreen
      yellowPanelRef={yellowPanelRef}
      greenPanelRef={greenPanelRef}
      onReglasClick={handleReglasClick}
      onAnotadorClick={handleAnotadorClick}
    />
  );
}
