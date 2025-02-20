import { useState } from "react";
import { useSelector } from "react-redux";
// icons
import { SidebarOpenIcon, SidebarCloseIcon } from "lucide-react";

// typography
import { TypoH3 } from "../ui/Typo";

// ui
import Item from "./Item";


// logout
import Logout from "../utils/Logout";

export default function Sidebar({ sidebar_data }) {
  const user_role = useSelector(s=>s.profile.data.role)
  // side bar active state:
  const [active, setActive] = useState(false);

  return (
    <>
      {/* sidebar btn container */}
      <div
        className={`h-14 max-md:backdrop-blur-lg max-md:bg-opacity-50 transition-all px-4 py-2 flex gap-4 md:justify-between items-center ${
          active ? "md:w-52 " : "w-20"
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
        className={`max-md:fixed h-full bg-slate-900 bg-opacity-70 md:duration-200 max-md:delay-200
        ${
          active
            ? "max-md:w-screen w-52 max-md:cursor-default max-md:block left-0 max-md:opacity-1"
            : " w-20 max-md:cursor-none max-md:opacity-0  max-md:left-[-200px]"
        }`}
      >
        {/* sidebar container */}
        <div
          className={`flex flex-col h-full items-center justify-between z-10 bg-slate-300 px-2 py-4 transition-all
            ${
              active
                ? "w-52 max-md:translate-x-0 max-md:cursor-default max-md:opacity-1"
                : "w-20 max-md:cursor-none max-md:-translate-x-full max-md:opacity-0"
            }
            `}
        >
          
          {/* sidebar header content */}
          <div className="w-full flex gap-2 flex-col items-center">
            {/* close button on mobile */}
            <div className="md:hidden w-full py-2 px-4 flex justify-end items-center" >
                <button onClick={() => setActive((p) => !p)}>
                  <SidebarCloseIcon className={`${active ? "" : "hidden"}`} />
                </button>
            </div>

            {sidebar_data?.length &&
              sidebar_data.map((item) => {
                
                // if user has allowed role than show
                if(item.allowed_roles.includes('*') || item.allowed_roles.includes(user_role)){
                    return <Item key={item.title} active={active} data={item} />
                }

              }
              )}
          </div>

          {/* sidebar footer */}
          <div className="w-full">
              <Logout show_title={active}/>
          </div>
        </div>
      </div>
    </>
  );
}
 