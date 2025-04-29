import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ReactPlayer from 'react-player';

// Fix react-player for client-side only
// @ts-ignore
window.ReactPlayer = ReactPlayer;

createRoot(document.getElementById("root")!).render(<App />);
