
import {
    PanelBottomCloseIcon
} from "lucide-react"


export default function AssignModel({state, children}){

    // close model
    const handleModelToggle = () => {
        state.set({
            active: false,
            imgUrl: '',
            userId: ''
        })
    }

    return (
        <>  
            { state.value.active && 
            // MODEL BG
            <section className="bg-black bg-opacity-50 w-full h-full max-h-screen fixed top-0 left-0 grid place-content-center"> 
                {/* Model Body */}
                <div className="flex max-h-[600px] flex-col gap-4 w-full h-full rounded-md px-6 py-4 bg-slate-200 overflow-y-scroll">

                    {/* Model Close Btn */}
                    <div className="flex justify-end items-center" title="close Model">
                        <button onClick={()=>handleModelToggle()}>
                            {<PanelBottomCloseIcon/> || "close"}
                        </button>
                    </div>
                    
                    {/* MAin content  */}
                    <div>
                        {children}
                    </div>
                </div>
            </section>
            }
        </>
    )
}