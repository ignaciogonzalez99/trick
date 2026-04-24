import { useReducer } from "react";

export type Screen = "home" | "config" | "anotador" | "reglas";
export type Team = "nosotros" | "ellos";

export type GameConfig = {
  jugadores: 4 | 6;
  limitePuntos: number;
  meta: number;
};

export type Puntos = {
  nosotros: number;
  ellos: number;
};

export type GameState = {
  screen: Screen;
  config: GameConfig;
  puntos: Puntos;
};

export type Action =
  | { type: "GO_TO_CONFIG" }
  | { type: "GO_TO_REGLAS" }
  | { type: "SET_JUGADORES"; payload: 4 | 6 }
  | { type: "SET_LIMITE"; payload: number }
  | { type: "START_GAME" }
  | { type: "ADD_POINT"; team: Team }
  | { type: "SUBTRACT_POINT"; team: Team }
  | { type: "RESET" };

const initialState: GameState = {
  screen: "home",
  config: {
    jugadores: 4,
    limitePuntos: 30,
    meta: 15,
  },
  puntos: {
    nosotros: 0,
    ellos: 0,
  },
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GO_TO_CONFIG":
      return { ...state, screen: "config" };

    case "GO_TO_REGLAS":
      return { ...state, screen: "reglas" };

    case "SET_JUGADORES":
      return {
        ...state,
        config: { ...state.config, jugadores: action.payload },
      };

    case "SET_LIMITE":
      return {
        ...state,
        config: {
          ...state.config,
          limitePuntos: action.payload,
          meta: action.payload / 2,
        },
      };

    case "START_GAME":
      return {
        ...state,
        screen: "anotador",
        puntos: { nosotros: 0, ellos: 0 },
      };

    case "ADD_POINT":
      return {
        ...state,
        puntos: {
          ...state.puntos,
          [action.team]: Math.min(
            state.config.limitePuntos,
            state.puntos[action.team] + 1
          ),
        },
      };

    case "SUBTRACT_POINT":
      return {
        ...state,
        puntos: {
          ...state.puntos,
          [action.team]: Math.max(0, state.puntos[action.team] - 1),
        },
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useGameState() {
  return useReducer(reducer, initialState);
}
