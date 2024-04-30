import React, { useState, useEffect, useRef } from 'react';

const KaraokeApp = () => {
  // Estado para almacenar los tiempos y palabras del poema
  const [lyrics, setLyrics] = useState([]);
  // Referencia al elemento de audio
  const audioRef = useRef(null);
  // Estado para almacenar el tiempo actual del audio
  const [currentTime, setCurrentTime] = useState(0);

  // Efecto que se ejecuta al cargar el componente
  useEffect(() => {
    // Función para cargar y parsear el archivo de texto
    const loadLyrics = async () => {
      try {
        const response = await fetch('http://localhost:4321/src/components/1228.lrc');
        const text = await response.text();

        // Parsear el texto del archivo para obtener tiempos y palabras del poema
        const lines = text.split('\n');
        const parsedLyrics = lines.map((line) => {
          const [timeStr, ...words] = line.trim().split(']');
          const time = timeStr.replace('[', '');
          const [minutes, seconds] = time.split(':');
          const totalSeconds = parseInt(minutes, 10) * 60 + parseFloat(seconds);
          return { time: totalSeconds, words: words.join(' ') };
        });

        // Actualizar el estado con los tiempos y palabras obtenidos
        setLyrics(parsedLyrics);
      } catch (error) {
        console.error('Error loading lyrics:', error);
      }
    };

    // Llamar a la función para cargar los datos del poema
    loadLyrics();
  }, []);

  // Función para reproducir el audio
  const playAudio = () => {
    audioRef.current.play();
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
  };

  // Función para pausar el audio
  const pauseAudio = () => {
    audioRef.current.pause();
    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
  };

  // Función para actualizar el tiempo actual del audio
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    // Lógica de sincronización del texto con el audio
    // Puedes añadir la lógica para resaltar palabras aquí
  };

  // Función para cambiar la posición del audio a un tiempo específico
  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Función para avanzar en el audio cierta cantidad de segundos
  const handleForward = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Función para retroceder en el audio cierta cantidad de segundos
  const handleBackward = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime -= seconds;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div>
      {/* Botones de reproducción y pausa del audio */}
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>

      <div>
        {/* Mostrar el poema con las palabras y su sincronización */}
        {lyrics.map((line, index) => (
          <pre key={index} style={{ color: currentTime >= line.time ? 'red' : 'white' }}>
            {line.words}{' '}
          </pre>
        ))}
      </div>

      {/* Elemento de audio con referencia */}
      <audio ref={audioRef} src="http://localhost:4321/src/components/1228.mp3" />

      {/* Controles para avanzar o retroceder en el audio */}
      <div>
        <button onClick={() => handleBackward(10)}>Backward 10s</button>
        <button onClick={() => handleForward(10)}>Forward 10s</button>
        {/* Control deslizante para cambiar la posición del audio */}
        <input
          type="range"
          min={0}
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          onChange={(e) => handleSeek(e.target.value)}
        />
      </div>
    </div>
  );
};

export default KaraokeApp;
