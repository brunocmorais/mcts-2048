import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MCTS } from "./pages/MCTS";


const root = document.getElementById('root')!;

createRoot(root).render(
    <HashRouter>
        <Routes>
            <Route path="/" 
                element={<Home/>}
            />
            <Route path="/mcts"
                element={<MCTS />}
            />
        </Routes>
    </HashRouter>
);  


