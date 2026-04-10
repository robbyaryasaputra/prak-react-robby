import { createRoot } from "react-dom/client";
import './tailwind.css';
import TailwindCSS from "./tailwindCSS";



createRoot(document.getElementById("root"))
    .render(
        <div>
              <TailwindCSS/>
        </div>
    );