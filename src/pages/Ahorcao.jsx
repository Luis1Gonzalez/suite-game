import React, { useEffect, useState } from "react";
import neno from "../data/phrases";





const Ahorcao = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");
    const [playerToRemove, setPlayerToRemove] = useState(null); // Jugador seleccionado para eliminar
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
    const [currentLetter, setCurrentLetter] = useState(""); // Letra ingresada
    const [phrase, setPhrase] = useState("HOLA MUNDO"); // Frase del juego
    const [revealedLetters, setRevealedLetters] = useState(
        phrase.split("").map((char) => (char === " " ? " " : "_"))
    ); // Letras reveladas
    const [incorrectLetters, setIncorrectLetters] = useState([]); // Letras incorrectas
    const [usedLetters, setUsedLetters] = useState([]); // Letras usadas
    const [attempts, setAttempts] = useState(0); // Contador de intentos fallidos
    const [isGameOver, setIsGameOver] = useState(false); // Estado del juego
    const [isVictory, setIsVictory] = useState(false); // Estado de victoria
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Índice del jugador actual

    // Añadir jugador
    const addPlayer = () => {
        if (newPlayer.trim() !== "") {
            setPlayers([...players, newPlayer]);
            setNewPlayer("");
        }
    };

    // Eliminar jugador específico
    const removePlayer = () => {
        setPlayers(players.filter((player) => player !== playerToRemove));
        setPlayerToRemove(null);
        setIsModalOpen(false);
    };

    // Limpiar todos los jugadores
    const clearPlayers = () => {
        setPlayers([]);
    };

    // Abrir modal de confirmación
    const confirmRemovePlayer = (player) => {
        setPlayerToRemove(player);
        setIsModalOpen(true);
    };

    // Limpiar campo de texto con letra
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addPlayer();
        }
    };

    // Limpiar campo de texto con letra
    const handleKeyPressLetter = (e) => {
        if (e.key === "Enter") {
            handleLetterSubmit();
        }
    };





    useEffect(() => {
        const getRandomPhrase = () => {
            const randomIndex = Math.floor(Math.random() * neno.length);
            setPhrase(neno[randomIndex]);
            console.log(neno[randomIndex]);
        };
        getRandomPhrase()
    }, [])

    // const handleRestartGame = () => {
    //     const randomIndex = Math.floor(Math.random() * neno.length);
    //     setPhrase(neno[randomIndex]);
    //     console.log(neno[randomIndex]);
    // };



    useEffect(() => {
        // Inicializar las letras reveladas al cargar la frase
        setRevealedLetters(phrase.split("").map((char) => (char === " " ? " " : "_")));
    }, [phrase]);

    const handleLetterSubmit = () => {
        if (!currentLetter || isGameOver || players.length === 0) return;

        const sanitizedLetter = currentLetter.toUpperCase();

        // Actualizar letras usadas (evitando duplicados)
        if (!usedLetters.includes(sanitizedLetter)) {
            setUsedLetters([...usedLetters, sanitizedLetter]);
        }

        // Mapa de vocales sin tilde a vocales con tilde
        const accentMap = {
            A: ["Á"],
            E: ["É"],
            I: ["Í"],
            O: ["Ó"],
            U: ["Ú"],
        };

        // Lista combinada de la letra ingresada y sus variantes acentuadas
        const lettersToCheck = [
            sanitizedLetter,
            ...(accentMap[sanitizedLetter] || []),
        ];

        // Verificar si la letra o alguna de sus variantes acentuadas están en la frase
        if (
            phrase
                .toUpperCase()
                .split("")
                .some((char) => lettersToCheck.includes(char))
        ) {
            // Actualizar letras reveladas correctamente
            const updatedLetters = phrase.split("").map((char, index) => {
                if (
                    char.toUpperCase() === sanitizedLetter ||
                    (accentMap[sanitizedLetter] || []).includes(char.toUpperCase())
                ) {
                    return char; // Mostrar la letra original (acentuada si corresponde)
                }
                return revealedLetters[index];
            });

            setRevealedLetters(updatedLetters);

            // Verificar si se completó la frase
            if (!updatedLetters.includes("_")) {
                setIsVictory(true);
                setIsGameOver(true);
            }
        } else {
            // Manejar letras incorrectas
            if (!incorrectLetters.includes(sanitizedLetter)) {
                setIncorrectLetters([...incorrectLetters, sanitizedLetter]);
                setAttempts(attempts + 1);

                // Verificar si alcanzó el límite de intentos
                if (attempts + 1 === phrase.length) {
                    setIsGameOver(true);
                }
            }
            // Pasar al siguiente jugador solo si falla
            setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        }

        setCurrentLetter(""); // Limpiar el campo
    };



    // Reiniciar el juego
    const handleRestartGame = () => {
        const randomIndex = Math.floor(Math.random() * neno.length);
        setPhrase(neno[randomIndex]);
        console.log(neno[randomIndex]);
        setRevealedLetters(phrase.split("").map((char) => (char === " " ? " " : "_")));
        setIncorrectLetters([]);
        setAttempts(0);
        setIsGameOver(false);
        setIsVictory(false);
        setCurrentLetter("");
        setUsedLetters([]);
    };
    console.log(phrase.length)
    return (
        <div className="py-8 px-8 bg-red-200">
            <div>
                {/* Botón para limpiar todos los jugadores */}
                <div className="flex flex-wrap justify-between items-center max-w-4xl mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
                        Jugadores
                    </h1>
                    <button
                        onClick={clearPlayers}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2 sm:mt-0"
                    >
                        Limpiar
                    </button>
                </div>

                {/* Panel superior: lista de jugadores */}
                <div className="bg-white shadow p-4 mb-6 max-w-4xl flex flex-wrap items-center gap-2">
                    {players.length > 0 ? (
                        players.map((player, index) => (
                            <span
                                key={index}
                                onClick={() => confirmRemovePlayer(player)}
                                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600 uppercase"
                            >
                                {player}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-500 italic text-center">
                            No hay jugadores aún.
                        </p>
                    )}
                </div>

                {/* Panel inferior: formulario para agregar jugadores */}
                <div className="bg-white shadow p-4 w-full max-w-4xl flex flex-col sm:flex-row gap-2 items-center">
                    <input
                        type="text"
                        value={newPlayer}
                        onChange={(e) => setNewPlayer(e.target.value)}
                        onKeyDown={handleKeyPress} // Escucha la tecla Enter nuevo jugador
                        placeholder="Nombre del jugador"
                        className="flex-1 border border-gray-300 p-2 rounded sm:w-auto"
                    />
                    <button
                        onClick={addPlayer}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
                    >
                        Agregar
                    </button>
                </div>

                {/* Modal de confirmación */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50 p-4 w-full">
                        <div className="bg-white rounded shadow-lg p-6 max-w-md h-[190px]">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                ¿Eliminar jugador?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                ¿Estás seguro de que deseas eliminar a{" "}
                                <span className="font-bold text-gray-800">{playerToRemove}</span>?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    No
                                </button>
                                <button
                                    onClick={removePlayer}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Sí
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Título del juego */}
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">La Ruleta</h1>

                {/* Mensaje del jugador actual */}
                {players.length > 0 && !isGameOver && (
                    <div className="text-lg font-semibold text-gray-700 mb-4 uppercase">
                        Jugador actual: {players[currentPlayerIndex]}
                    </div>
                )}

                {/* Mensajes de fin del juego */}
                {isGameOver && (
                    <div
                        className={`p-4 rounded mb-4 text-center ${isVictory ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                    >
                        <p className="uppercase">
                            {isVictory
                                ? `¡Felicidades ${players[currentPlayerIndex]}! Has completado la frase `
                                : "¡Has perdido! Mejor suerte la próxima vez 😞"}
                        </p>
                        <button
                            onClick={handleRestartGame}
                            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Jugar de nuevo
                        </button>
                    </div>
                )}



                {/* Letras usadas */}
                <div className="bg-green-100 text-green-700 p-4 rounded mb-4 text-center">
                    <p>
                        <strong>Letras usadas:</strong> {usedLetters.join(", ") || "Ninguna"}
                    </p>
                </div>

                {/* Letras incorrectas */}
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-4 text-center">
                    <p>
                        <strong>Letras incorrectas:</strong> {incorrectLetters.join(", ") || "Ninguna"}
                    </p>
                </div>

                {/* Contador de intentos */}
                <div className="bg-red-100 text-red-600 p-4 rounded mb-4 text-center">
                    <p>
                    <strong>Intentos fallidos:</strong> <strong>{attempts}</strong> / {phrase.length}
                    </p>
                </div>

                {/* Ingreso de letra */}
                <input
                    type="text"
                    maxLength="1"
                    value={currentLetter}
                    onChange={(e) => setCurrentLetter(e.target.value)}
                    onKeyDown={handleKeyPressLetter} // Escucha la tecla Enter nuevoa letra
                    className="border-2 p-2 rounded w-20 text-center border-black"
                    disabled={isGameOver || players.length === 0}
                />
                <button
                    onClick={handleLetterSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 mb-4"
                    disabled={isGameOver || players.length === 0}
                >
                    Enviar letra
                </button>

                {/* Sección de las letras reveladas */}
                <div className="bg-white shadow p-4 w-full max-w-4xl rounded grid grid-cols-5 sm:grid-cols-8 gap-4">
                    {phrase.split("").map((char, index) => (
                        <div
                            key={index}
                            className={`w-12 h-12 flex justify-center items-center border border-gray-300 rounded bg-gray-50 text-xl font-bold text-gray-700 ${char === " " ? "bg-gray-600" : ""}`}
                        >
                            {revealedLetters[index] !== "_" ? revealedLetters[index] : ""}
                        </div>
                    ))}
                </div>





            </div>
        </div>
    );
};

export default Ahorcao;
