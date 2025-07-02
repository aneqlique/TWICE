import { useState, useRef , useEffect } from "react";

export default function App() {

  const [volume, setVolume] = useState(1); 
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);



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

      <body className="bg-(--color-white) scroll-smooth">
        <main>
          
          <div className="bg-[url(/images/darkbg.png)] relative bg-cover bg-center h-screen w-screen flex items-center justify-center">
            <audio ref={audioRef} src="/audio/TWICE-DIVE.mp3"/>
            <div className="absolute w-[200px] sm:w-[260px] md:w-[280px] drop-shadow-2xl transition-all duration-400 ease-in-out">
              <img src="/images/darkphone.png" alt="phone" className="w-full h-full" />

              <div className="absolute mt-2 md:mt-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[160px] sm:w-[200px] md:w-[220px] px-4 pt-5 sm:pt-8 pb-2 bg-white/40 backdrop-blur-xl rounded-3xl shadow-lg transition-all duration-400 ease-in-out">
                <div className="flex flex-col items-center">
                      <img
                        src="/images/twice dark.jpg"
                        alt="DIVE - TWICE"
                        className="w-28 sm:w-35 md:w-42 rounded-xl mb-2 transition-all duration-400 ease-in-out"
                      />

                      {/* YUNG KANTA */}
                      <div className="text-(--color-black) text-10px md:text-15px font-semibold">DIVE</div>
                      <div className="text-(--color-black) text-sm md:text-sm mb-1">TWICE</div>

                      {/* PROGRESS BAR NG KANTA */}
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
                      <div className="px-2 flex justify-between text-[8px] font-bold text-(--color-black) w-full mb-2">
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
                        {/* PLAY */}
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
          </div>

          {/* <div className="bg-[url(/images/darkbg.png)] bg-cover bg-center h-screen w-screen flex items-center justify-center">
            {/ * Phone Wrapper (relative for positioning the widget) * /}
            <div className="relative w-[200px] sm:w-[260px] md:w-[280px] drop-shadow-2xl transition-all duration-400 ease-in-out">
              {/ * Phone Image * /}
              <img src="/images/darkphone.png" alt="phone" className="w-full h-full" />

              {/ * Music Widget (Centered on phone screen)  * /}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[160px] sm:w-[200px] md:w-[220px] px-4 pt-6 pb-2 bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg">
                <div className="flex flex-col items-center">
                  <img
                    src="/images/twice dark.jpg"
                    alt="DIVE - TWICE"
                    className="w-32 rounded-xl mb-2"
                  />
                  <div className="text-white text-sm font-semibold">DIVE</div>
                  <div className="text-gray-300 text-xs mb-2">TWICE</div>
                  <div className="w-full h-1 bg-gray-400 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-white w-1/2"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-300 w-full mb-2">
                    <span>1:38</span>
                    <span>3:21</span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button className="text-white">⏮️</button>
                    <button
                      className="text-white text-xl"
                      onClick={() => setPlaying(!playing)}
                    >
                      {playing ? "⏸️" : "▶️"}
                    </button>
                    <button className="text-white">⏭️</button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}


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

// import { useState } from "react";
// import darkbg from "/images/darkbg.png"; // Set your background image here
// import phone from "/images/darkphone.png"; // Phone mockup PNG (uploaded)

// export default function App() {
//   const [playing, setPlaying] = useState(true);

//   return (
//     <div
//       className="relative w-screen h-screen bg-cover bf-fixed bg-center flex items-center justify-center"
//       style={{ backgroundImage: `url(${darkbg})` }}
//     >
//       <img
//         src={phone}
//         alt="phone mockup"
//         className="absolute w-[300px] sm:w-[360px] md:w-[400px] drop-shadow-2xl"
//       />

//       {/* Widgets */}
//       <div className="absolute w-[260px] sm:w-[300px] md:w-[340px] px-4 pt-6 pb-2 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg top-[90px]">
//         <div className="flex flex-col items-center">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/en/e/e4/Twice_-_With_You-th_%28digital_album%29.png"
//             alt="DIVE - TWICE"
//             className="w-32 rounded-xl mb-2"
//           />
//           <div className="text-white text-sm font-semibold">DIVE</div>
//           <div className="text-gray-300 text-xs mb-2">TWICE</div>
//           <div className="w-full h-1 bg-gray-400 rounded-full overflow-hidden mb-1">
//             <div className="h-full bg-white w-1/2"></div>
//           </div>
//           <div className="flex justify-between text-[10px] text-gray-300 w-full mb-2">
//             <span>1:38</span>
//             <span>3:21</span>
//           </div>
//           <div className="flex items-center justify-center gap-4">
//             <button className="text-white">⏮️</button>
//             <button
//               className="text-white text-xl"
//               onClick={() => setPlaying(!playing)}
//             >
//               {playing ? "⏸️" : "▶️"}
//             </button>
//             <button className="text-white">⏭️</button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="absolute bottom-6 flex justify-center gap-3 w-full px-4">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <button
//             key={index}
//             className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-md"
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// }
