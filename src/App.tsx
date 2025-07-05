
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useRef , useEffect } from "react";

export default function App() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [volume, setVolume] = useState(1); 
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0); 
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);

  },[]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  return (
    <>
      <body className="bg-(--color-white) scroll-smooth ">
        <main>

          <div className=
            {`relative w-screen h-screen bg-cover bg-center  flex items-center justify-center transition-all duration-500 ease-in-out ${
              isDark ? "bg-[url('/images/darkbg.png')]" : "bg-[url('/images/lightbg.png')]"
            }`}
          >
            <button
              onClick={toggleTheme}
              className="absolute top-4 right-4 p-2 text-sm backdrop-blur-md text-white rounded-lg z-50 ease-in-out cursor-pointer "
            >
              <img
                src={isDark ? "/images/lightmode.png" : "/images/darkmode.png"}
                alt={isDark? "light" : "dark"}
                className="w-10 h-10 md:h-12 md:w-12 transition-all duration-400 ease-in-out"
              />
            </button>

            <audio ref={audioRef} src="/audio/TWICE-DIVE.mp3"/>
            <div className="absolute w-[200px] sm:w-[260px] md:w-[280px] drop-shadow-2xl transition-all duration-400 ease-in-out">
              <img
                src={isDark ? "/images/darkphone.png"  : "/images/lightphone.png"}
                alt="phone" 
                className="w-full h-full transition-all duration-400 ease-in-out" />

              <div className="absolute mt-2 md:mt-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[160px] sm:w-[200px] md:w-[220px] px-4 pt-5 sm:pt-8 pb-2 bg-white/40 backdrop-blur-xl rounded-3xl shadow-lg transition-all duration-400 ease-in-out">
                <div className="flex flex-col items-center transition-all duration-400 ease-in-out">
                      <img
                        src={isDark ? "/images/twice dark.jpg" : "/images/twice light.jpg"}
                        alt="DIVE - TWICE"
                        className="w-28 sm:w-35 md:w-42 rounded-xl mb-2 transition-all duration-400 ease-in-out"
                      />

                      {/* SONG */}
                      <div className="text-(--color-black) text-10px md:text-15px font-semibold">DIVE</div>
                      <div className="text-(--color-black) text-sm md:text-sm mb-1">TWICE</div>

                      {/* PROGRESS BAR */}
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={progress}
                        onChange={handleSeek}
                        className="w-full h-1 rounded-full appearance-none bg-(--color-gradient) my-2
                                  [&::-webkit-slider-thumb]:appearance-none 
                                  [&::-webkit-slider-thumb]:h-3 
                                  [&::-webkit-slider-thumb]:w-3 
                                  [&::-webkit-slider-thumb]:rounded-full 
                                  [&::-webkit-slider-thumb]:bg-(--color-black) 
                                  [&::-webkit-slider-thumb]:cursor-pointer 
                                  [&::-moz-range-thumb]:appearance-none 
                                  [&::-moz-range-thumb]:h-3 
                                  [&::-moz-range-thumb]:w-3 
                                  [&::-moz-range-thumb]:rounded-full 
                                  [&::-moz-range-thumb]:bg-(--color-black) 
                                  [&::-moz-range-thumb]:cursor-pointer"
                        style={{
                        background: `linear-gradient(to right, #1D1D1D ${progress / duration * 100}%, #B5B9BD ${progress / duration * 100}%)`,
                        }}
                        step="0.01"
                      ></input>


                      {/* TIME FORMAT */}
                      <div className="px-1/2 flex justify-between text-[8px] font-bold text-(--color-black) tracking-wide w-full mb-2">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>

                      </div>

                      {/* MUSIC CONTROLS */}
                      <div className="flex items-center justify-center gap-4">
                        {/* BACK */}
                        <button className="text-white">
                          <img
                            src="/images/back.png"
                            alt="back"
                            className="h-6 w-6 md:h-10 md:w-10 object-cover duration-300"
                            />
                        </button>
                        {/* PAUSE PLAY */}
                        <button
                          className="text-white text-xl cursor-pointer transition-all duration-400 ease-in-out "
                          onClick={togglePlay}>
                            <img
                              src={isPlaying ? "/images/pause.png" : "/images/play.png"}
                              alt={isPlaying ? "Pause" : "Play"}
                              className="w-6 h-6 md:h-9 md:w-9"
                            />
                        </button>
                        {/* FORWARD */}
                        <button className="text-white">
                        <img
                          src="/images/forward.png"
                          alt="back"
                          className="h-6 w-6 md:h-10 md:w-10 object-cover duration-300"
                          />
                        </button>
                      </div>

                      {/* VOLUME CONTROLS */}
                      <div className="flex py-1 sm:mx-1 md:mt-2 md:mb-3">
                        <button className="text-white">
                            <img
                              src="/images/volDown.png"
                              alt="back"
                              className="h-4 w-4 md:h-6 md:w-6 mr-3 ml-1 object-cover duration-300"
                              />
                        </button>

                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-full h-1 rounded-full appearance-none bg-gray-400 my-3 
                                    [&::-webkit-slider-thumb]:appearance-none 
                                    [&::-webkit-slider-thumb]:h-4 
                                    [&::-webkit-slider-thumb]:w-4 
                                    [&::-webkit-slider-thumb]:rounded-full 
                                    [&::-webkit-slider-thumb]:bg-black 
                                    [&::-webkit-slider-thumb]:cursor-pointer 
                                    [&::-moz-range-thumb]:appearance-none 
                                    [&::-moz-range-thumb]:h-4 
                                    [&::-moz-range-thumb]:w-4 
                                    [&::-moz-range-thumb]:rounded-full 
                                    [&::-moz-range-thumb]:bg-black 
                                    [&::-moz-range-thumb]:cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #1D1D1D ${volume * 100}%, #B5B9BD ${volume * 100}%)`,
                          }}
                        />

                        <button className="text-white">
                            <img
                              src="/images/volUp.png"
                              alt="back"
                              className="h-5 w-5 md:h-7 md:w-7 ml-1 mr-3 object-cover duration-300"
                              />
                        </button>
                      </div>
                </div>
               
              </div>
              
            </div>
              <div className="relative mb-23 sm:mb-0 mt-100 md:mt-108 flex justify-center gap-4 sm:gap-5 w-full px-4 transition-all duration-400 ease-in-out">
                <a href="https://www.instagram.com/twicetagram" target="_blank" rel="noopener noreferrer">
                  <img
                    src={isDark ? "/images/igdark.png" : "/images/ig.png" }
                    alt="back"
                    className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer rounded-lg bg-white/60 backdrop-blur-md shadow-md"
                  />
                </a>

                <a href="https://youtu.be/QGCkDOkpWf8?si=UImywlR_AshNohLN" target="_blank" rel="noopener noreferrer">
                  <img
                    src={isDark ? "/images/ytdark.png" : "/images/yt.png" }
                    alt="back"
                    className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer rounded-lg bg-white/60 backdrop-blur-md shadow-md"
                  />
                </a>

                <a href="https://open.spotify.com/album/7tgTOUXm74GKA12wsQIUPu?si=4cQU1_QxQFe2n1r9GVM4Cw" target="_blank" rel="noopener noreferrer">
                  <img
                    src={isDark ? "/images/spdark.png" : "/images/sp.png" }
                    alt="back"
                    className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 cursor-pointer rounded-lg bg-white/60 backdrop-blur-md shadow-md"
                  />
                </a>
              </div>
          </div>
        </main>
      </body>
    </>
  )

  function formatTime(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  }
}
