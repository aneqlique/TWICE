
// export default function App() {
//   return (
//     <>

//       <body className="bg-(--color-white) scroll-smooth">
//         <main>
          
//           <div className="bg-[url(/images/darkbg.png)] bg-cover bg-center flex items-center justify-center">
//           <div className="relative">
//             <p className="text-2xl">one in a million!</p>   
//             <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//           </div>
//           </div>

//         </main>
//       </body>


//     </>
//   )
// }

import { useState } from "react";
import darkbg from "/images/darkbg.png"; // Set your background image here
import phone from "/images/darkphone.png"; // Phone mockup PNG (uploaded)

export default function App() {
  const [playing, setPlaying] = useState(true);

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${darkbg})` }}
    >
      <img
        src={phone}
        alt="phone mockup"
        className="absolute w-[300px] sm:w-[360px] md:w-[400px] drop-shadow-2xl"
      />

      {/* Widgets */}
      <div className="absolute w-[260px] sm:w-[300px] md:w-[340px] px-4 pt-6 pb-2 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg top-[90px]">
        <div className="flex flex-col items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/e/e4/Twice_-_With_You-th_%28digital_album%29.png"
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

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 flex justify-center gap-3 w-full px-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-md"
          ></button>
        ))}
      </div>
    </div>
  );
}
