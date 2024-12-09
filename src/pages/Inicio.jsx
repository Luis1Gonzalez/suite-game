import { useNavigate } from 'react-router-dom'
import sinPalabras from '../assets/sinPalabras.png';

const Inicio = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-background min-h-screen flex flex-col items-center py-10">
            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                PlayArcade
            </h1>

            {/* Botones de Juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 px-4 max-w-5xl w-full">
                {/* Botón Grande (Principal) */}
                <button
                    onClick={() => navigate(`/sinpalabras`)}
                    className="lg:col-span-8 sm:col-span-2 h-[180px] sm:h-[280px] lg:h-[380px] bg-primary text-neutral text-lg sm:text-xl lg:text-2xl font-semibold rounded-lg shadow-lg hover:bg-secondary transition-all flex flex-col items-center justify-center py-2"
                >
                    Sin Palabras
                </button>
                {/* Botones Secundarios */}
                <button
                onClick={() => navigate(`/la-ruleta`)}
                className="lg:col-span-4 sm:col-span-1 h-[140px] sm:h-[180px] bg-success text-neutral text-md sm:text-xl font-medium rounded-lg shadow-md hover:bg-secondary transition-all">
                    La Ruleta
                </button>
                <button className="lg:col-span-4 sm:col-span-1 h-[140px] sm:h-[180px] bg-warning text-neutral text-md sm:text-xl font-medium rounded-lg shadow-md hover:bg-secondary transition-all">
                    Juego 3
                </button>
                <button className="lg:col-span-4 sm:col-span-1 h-[140px] sm:h-[180px] bg-success text-neutral text-md sm:text-xl font-medium rounded-lg shadow-md hover:bg-secondary transition-all">
                    Juego 4
                </button>
                {/* Botón Mediano */}
                <button className="lg:col-span-6 sm:col-span-2 h-[180px] sm:h-[260px] bg-primary text-neutral text-lg sm:text-xl lg:text-2xl font-semibold rounded-lg shadow-lg hover:bg-secondary transition-all">
                    Juego Especial
                </button>
                {/* Botones Pequeños */}
                <button className="lg:col-span-3 sm:col-span-1 h-[120px] sm:h-[140px] bg-warning text-neutral text-sm sm:text-lg font-medium rounded-lg shadow-md hover:bg-secondary transition-all">
                    Juego 5
                </button>
                <button className="lg:col-span-3 sm:col-span-1 h-[120px] sm:h-[140px] bg-success text-neutral text-sm sm:text-lg font-medium rounded-lg shadow-md hover:bg-secondary transition-all">
                    Juego 6
                </button>
            </div>
        </div>
    );
}

export default Inicio
