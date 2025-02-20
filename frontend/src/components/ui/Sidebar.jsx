import { useState } from "react";

import { HomeIcon, SidebarOpenIcon, SidebarCloseIcon } from "lucide-react";
import { TypoH3 } from "../ui/Typo";

// ui
import Item from "./Item";

export default function Sidebar({ sidebar_data }) {
  // side bar active state:
  const [active, setActive] = useState(false);

  return (
    <>
      {/* sidebar btn container */}
      <div
        className={`max-md:w-screen transition-all px-4 py-2 flex gap-4 md:justify-between items-center ${
          active ? "md:w-52" : "w-20"
        }`}
      > 
        {/* sidebar heading */}
        <TypoH3
          className={`transition-all ${
            active
              ? ""
              : "md:opacity-0 md:top-[-100px] md:absolute md:cursor-none"
          }`}
        >
          Rajneesh
        </TypoH3>

        {/* didebar close btn */}
        <button onClick={() => setActive((p) => !p)}>
          <SidebarOpenIcon className={`${active ? "hidden" : ""}`} />
          <SidebarCloseIcon className={`${active ? "" : "hidden"}`} />
        </button>
      </div>

      {/* sidebar Background container */}
      <div
        className={`max-md:fixed max-md:h-full bg-slate-900 h-full outline overflow-clip bg-opacity-70 md:duration-200 max-md:delay-200
        ${
          active
            ? "max-md:w-screen w-52 max-md:cursor-default max-md:opacity-1"
            : " w-20 max-md:cursor-none max-md:opacity-0"
        }`}
      >
        {/* sidebar container */}
        <div
          className={`flex flex-col items-center justify-between bg-slate-300 px-2 h-full py-4 transition-all
            ${
              active
                ? "w-52 max-md:translate-x-0 max-md:cursor-default max-md:opacity-1"
                : "w-20 max-md:cursor-none max-md:-translate-x-full max-md:opacity-0"
            }
            `}
        >
          {/* sidebar header content */}
          <div className="w-full flex flex-col items-center">
            {sidebar_data?.length &&
              sidebar_data.map((item) => (
                <Item key={item.title} active={active} data={item} />
              ))}
          </div>

          {/* sidebar footer */}
          <div></div>
        </div>
      </div>
    </>
  );
}
