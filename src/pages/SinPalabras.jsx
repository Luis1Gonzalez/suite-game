import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Back from '../assets/back.svg'


const SinPalabras = () => {
    const [imageUrl, setImageUrl] = useState(""); // URL de la imagen
    const [tags, setTags] = useState(""); // Tags de la imagen
    const [timer, setTimer] = useState(0); // Contador en segundos
    //   const [progress, setProgress] = useState(100); // Porcentaje de progreso
    const [progressWidth, setProgressWidth] = useState(100); // Ancho de la barra de progreso
    const API_KEY = import.meta.env.VITE_API_KEY;

    const navigate = useNavigate()

    const fetchRandomImage = async () => {
        try {
            const response = await axios.get(
                `https://pixabay.com/api/?key=${API_KEY}&q=random&image_type=photo&per_page=200&lang=es`
            );
            const images = response.data.hits;
            if (images.length > 0) {
                // Elegir una imagen aleatoria del array
                const randomImage = images[Math.floor(Math.random() * images.length)];
                setImageUrl(randomImage.webformatURL);
                setTags(randomImage.tags || "Sin etiquetas");
            } else {
                console.error("No se encontraron imágenes");
            }
        } catch (error) {
            console.error("Error al buscar la imagen:", error);
        }
    };

    const startCountdown = (duration) => {
        setTimer(duration);
        // setProgress(100);
        setProgressWidth(100);
    };

    const resetGame = () => {
        setTimer(0);
        // setProgress(100);
        setProgressWidth(100);
        setImageUrl(""); // Resetea la imagen
        setTags(""); // Resetea las etiquetas
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
                // setProgress((prev) => (timer / 120) * 100);
                setProgressWidth((prev) => (prev > 0 ? prev - 100 / 120 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 min-h-screen">
            <h1 className="text-3xl font-extrabold text-purple-800 drop-shadow-md">
                Sin Palabras
            </h1>

            {/* Contenedor de la Imagen */}
            <div className="relative w-80 h-80 flex justify-center items-center bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Imagen aleatoria"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <p className="text-gray-500 text-center font-medium">
                        Haz clic en <strong>Buscar</strong> para ver una imagen
                    </p>
                )}
            </div>

            {/* Mostrar Tags */}
            {tags && (
                <p className="text-gray-700 text-center font-bold text-2xl italic">
                    {`${tags}`}
                </p>
            )}


            {/* Barra de Progreso Horizontal */}
            {timer > 0 && (
                <div className="w-72 h-4 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${progressWidth > 25 ? "bg-blue-500" : "bg-red-500"
                            } transition-all`}
                        style={{ width: `${progressWidth}%` }}
                    ></div>
                </div>
            )}


            {/* Barra de Progreso Circular */}
            {/* {timer > 0 && (
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90 text-purple-200">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              strokeWidth="6%"
              stroke="currentColor"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              strokeWidth="6%"
              stroke="#9333ea"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              style={{
                transition: "stroke-dashoffset 1s linear"
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-bold text-lg">
            {timer}
          </div>
        </div>
      )} */}

            {/* Botones */}
            <div className="space-x-4">
                {timer === 0 ? (
                    <button
                        onClick={() => {
                            fetchRandomImage();
                            startCountdown(120); // Inicia el temporizador a 120 segundos
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:from-purple-600 hover:to-blue-600 transition duration-300"
                    >
                        Buscar
                    </button>
                ) : (
                    <button
                        onClick={resetGame}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition duration-300"
                    >
                        Parar
                    </button>
                )}
            </div>

            {/* Botón Volver al inicio */}
            <button
                onClick={() => navigate(`/`)}
                className="mt-4 p-2 w-16 h-16 bg-gradient-to-r from-green-500 to-teal-700 text-white font-semibold rounded-full shadow-md hover:shadow-2xl hover:from-green-600 hover:to-teal-800 transition duration-300 "
            >
                <img className=" hover:shadow-2xl" src={Back} alt="" />
            </button>

        </div>
    );
};

export default SinPalabras;
