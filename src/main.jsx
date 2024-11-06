import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./reset.css";
import "./index.css";

import App from "./App";

const root = document.getElementById("root");

if (!root) {
	throw new Error("No root element found");
}

void createRoot(root).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
