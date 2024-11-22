import type { CursorCoordinates } from "./useCursorCoordinates";
import { createContext } from "react";

export const CursorContext = createContext<CursorCoordinates>({ x: 0, y: 0 });
