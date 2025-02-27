import glowSvg from "/icon.svg";
import github from "/github.svg";

import {CircleUser} from "lucide-react"

export default function GlowBox() {
    const message = "Our hosting is on a free server, so it shut down after a while & start again, So just click on login/register and wait for a moment."
  return (
    <>
      <div className="bg-black hidden md:flex relative md:items-center md:justify-center w-1/2 overflow-hidden">
        
        <div className="w-[60%] p-[3px] bg-gradient-to-br from-cyan-300 via-indigo-600 to-pink-500 bg-opacity-95 backdrop-blur-md rounded-lg *:rounded-lg">
            <img src={glowSvg} className="w-full absolute z-0 top-0 -translate-y-20 scale-x-[250%] -rotate-12" />
            <div className="size-full px-6 py-4 bg-black text-gray-50 bg-opacity-75  backdrop-blur-md">
                <h1 className="font-semibold text-xl mb-2">~RajneeshZytox</h1>
                "{message}"

                <div className="text-sm mt-2 text-gray-300">Here Take 🍿 while you wait...</div>
                <div className="text-sm mt-2 text-gray-300 flex justify-end items-center gap-2 opacity-85">
                    <a href="https://rajneeshzytox.netlify.app/" target="_blank" title="portfolio">
                            <CircleUser  className="w-5"/>
                    </a>
                    <a href="https://github.com/Rajneeshzytox/nextLab_assignment_app" target="_blank" title="see github repo">
                            <img src={github} className="w-5 opacity-75" alt="github repo" />   
                    </a>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}