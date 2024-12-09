import Inicio from "./pages/Inicio"
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SinPalabras from "./pages/SinPalabras"
import Ahorcao from "./pages/Ahorcao"

const Core = () => {
    return (
        <div className="bg-background min-w-[360px]">
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<Inicio />} />
                    <Route path="/sinpalabras" element={<SinPalabras />} />
                    <Route path="/la-ruleta" element={<Ahorcao />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Core
