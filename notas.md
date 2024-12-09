import React, { useState } from "react";


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
    const [attempts, setAttempts] = useState(0); // Contador de intentos fallidos
    const [isGameOver, setIsGameOver] = useState(false); // Estado del juego
    const [isVictory, setIsVictory] = useState(false); // Estado de victoria

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

    // Manejar la tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addPlayer();
        }
    };


    const handleLetterSubmit = () => {
        if (!currentLetter || isGameOver) return;

        const sanitizedLetter = currentLetter.toUpperCase();

        if (phrase.toUpperCase().includes(sanitizedLetter)) {
            // Actualizar letras reveladas
            const updatedLetters = revealedLetters.map((char, index) =>
                phrase[index].toUpperCase() === sanitizedLetter ? phrase[index] : char
            );
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
                if (attempts + 1 >= 6) {
                    setIsGameOver(true);
                }
            }
        }

        setCurrentLetter(""); // Limpiar el campo
    };

    const handleRestartGame = () => {
        // Reiniciar todos los estados
        setPhrase("HOLA MUNDO"); // Puedes cambiar la frase aquí
        setRevealedLetters("HOLA MUNDO".split("").map((char) => (char === " " ? " " : "_")));
        setIncorrectLetters([]);
        setAttempts(0);
        setIsGameOver(false);
        setIsVictory(false);
        setCurrentLetter("");
    };




    

    return (
        <div className="py-8 px-8 bg-red-200">
            <div className="">
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
                                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600"
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
                        onKeyDown={handleKeyPress} // Escucha la tecla Enter
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




            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                {/* Título del juego */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Juego del Ahorcado</h1>

                {/* Mensajes de fin del juego */}
                {isGameOver && (
                    <div
                        className={`p-4 rounded mb-4 text-center ${isVictory ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                    >
                        <p>
                            {isVictory
                                ? "¡Felicidades! Has completado la frase 🎉"
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

                {/* Contador de intentos */}
                <div className="bg-red-100 text-red-600 p-4 rounded mb-4 text-center">
                    <p>Intentos fallidos: <strong>{attempts}</strong> / 6</p>
                </div>

                {/* Letras incorrectas */}
                <div className="bg-yellow-100 text-yellow-700 p-2 rounded mb-4 w-full max-w-lg text-center">
                    <p>Letras incorrectas: {incorrectLetters.length > 0 ? incorrectLetters.join(", ") : "Ninguna"}</p>
                </div>

                {/* Sección de entrada de letras */}
                <div className="bg-white shadow p-4 w-full max-w-lg rounded mb-6 flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        maxLength={1}
                        value={currentLetter}
                        onChange={(e) => setCurrentLetter(e.target.value)}
                        placeholder="Ingresa una letra"
                        className="border border-gray-300 p-2 rounded w-full sm:w-auto text-lg"
                        disabled={isGameOver}
                    />
                    <button
                        onClick={handleLetterSubmit}
                        className="bg-blue-500 text-white px-6 py-2 rounded text-lg hover:bg-blue-600 w-full sm:w-auto"
                        disabled={isGameOver}
                    >
                        Enviar
                    </button>
                </div>

                {/* Sección de las letras reveladas */}
                <div className="bg-white shadow p-4 w-full max-w-4xl rounded grid grid-cols-5 sm:grid-cols-8 gap-4">
                    {revealedLetters.map((char, index) =>
                        char === " " ? (
                            <div key={index} className="w-12 h-12"></div>
                        ) : (
                            <div
                                key={index}
                                className="w-12 h-12 flex justify-center items-center border border-gray-300 rounded bg-gray-50 text-xl font-bold text-gray-700"
                            >
                                {char !== "_" ? char : ""}
                            </div>
                        )
                    )}
                </div>
            </div>





























        </div>
    );
};

export default Ahorcao;
