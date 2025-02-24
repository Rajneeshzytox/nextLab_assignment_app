import { useEffect, useState } from "react";
// state
import { useSelector, useDispatch } from "react-redux";
import { fetch_not_claimed_apps } from "../../states/UserStates/apps_not_claimed";

// Model
import Model from "../../components/ui/Model";

// download App api js
import { downloadApp } from "../../api/User_api/downloadApp";
import uploadImage from "../../api/img_upload"

// icon
import { ListTodoIcon } from "lucide-react";
// typo
import {
  TypoCode,
  TypoH2,
  TypoH3,
  TypoH4,
  TypoSmall,
} from "../../components/ui/Typo";

// task Card
export function TaskCard({ app, setModelActive }) {
  const app_reference = {
    id: 1,
    title: "app-2",
    points: 0,
    img: null,
    url: "http://google.com",
    categories: [
      {
        id: 1,
        title: "abcd",
        date_created: "2025-02-14",
      },
    ],
    sub_categories: [
      {
        id: 1,
        title: "sub-cat-1",
        category: {
          id: 1,
          title: "abcd",
          date_created: "2025-02-14",
        },
        date_created: "2025-02-14",
      },
    ],
    is_active: true,
    date_created: "2025-02-14",
  };

  return (
    <>
      <div className="CARD_Task px-8 py-6 hover:shadow-lg duration-300 transition-all hover:shadow-slate-200 bg-white border border-slate-400 rounded-xl flex flex-col gap-4 hover:text-black z-0 hover:scale-100 scale-95">

          {/* icons & title */}
          <div className="flex items-center gap-4">
            {/* app icon */}
            <div className="w-10 aspect-square rounded-full grid place-content-center uppercase bg-slate-300">
              {app.img ? <img src={app.img} /> : app.title.charAt(0)}
            </div>

            {/* title */}
            <TypoH4 className="capitalize">{app.title}</TypoH4>
          </div>

          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 *:px-4 *:bg-slate-300 text-slate-700 rounded-md">
            {app.categories.map((category) => (
              <TypoCode className="font-normal" key={category.id}>
                {category.title}
              </TypoCode>
            ))}
          </div>

          {/* Sub -categories */}
          <div className="flex flex-wrap gap-2 *:px-2 *:py-1 *:bg-slate-100 text-slate-500">
            {app.sub_categories.map((sub_category) => (
              <TypoSmall key={sub_category.id}>{sub_category.title}</TypoSmall>
            ))}
          </div>
        
        <div>

        </div>

        <div className="flex items-center">
            {/* points */}
            <button onClick={()=>setModelActive(app.id)} className="w-fit px-6 hover:bg-slate-950 bg-slate-700 text-slate-50 rounded">
                Earn {app.points}
            </button>

            {/* points */}
            <a target="_blank" href={app.url} className="w-fit px-6 hover:underline">
                visit
            </a>
        </div>
      </div>
    </>
  );
}

// TASK COMPONENTS
export default function Tasks() {
  const pending_apps = useSelector((s) => s.pending_apps);
  const dispatch = useDispatch();

  // Download flow --> [Tasks] =(appId)=> [Model] =(appId)=> handleImageUpload =(appId, imgUrl)=> handleDownload =(appId, imgUrl)=> downloadApp

  // Alert Message: 
  const [alert, setAlert] = useState(
    {
      active: false,
      message: '',
      success: false,
    }
  )
  // Upload ScreenShot Model: 
  const [model, setModel] = useState({
    appId: -1,
    active: false
  })
  
  // HANDLE SEND REQ FOR DOWNLOAD 
  const closeModel = () => {
    setModel({
      appId: -1,
      active: false
    })
  }

  // set model active
  const setModelActive = (appId) => {
    setModel({
      appId: appId,
      active:true
    })
  }

  // HANDLE SEND REQ FOR DOWNLOAD 
  const handleImageUpload = async (e, fileId, appId) => {
    e.target.value = "uploading..."

    const res = await uploadImage(fileId);
    if (res.status == 200) {
      e.target.value = "upload successfully"

      // send download req
      handleDownload(appId, res.imgUrl)
      return;
    }

    e.target.value = "failed to upload"
    closeModel();
    setAlert({active:true, message:res.message})
  }


  // HANDLE SEND REQ FOR DOWNLOAD 
  const handleDownload = async (appId, imgUrl) => {
      const res = await downloadApp(appId, imgUrl)

      closeModel()
      // Download Success
      if(res.success){
        setAlert({
            active: true,
            message: res.message,
            success: true
        })
        dispatch(fetch_not_claimed_apps())
        return
      }
      
      // Download Failed : ALert
      setAlert({
        active:true,
        message:res.message,
        success:false
      })

  }

  // HEY NEVER REMOVE This STATE AS tHERE WILL BE INFINITE REQUEST CALLS
  const [Limit_fetch, setLimit_fetch] = useState(2)

  useEffect(() => {
    if (pending_apps.data.length == 0 && Limit_fetch>0) {
      // alert("fetching tasks,");
      setLimit_fetch(p=>p-1)
      dispatch(fetch_not_claimed_apps());
    }
  }, [dispatch, pending_apps.data]);


  // IF PENDING OR LoADING 
  if (pending_apps.isLoad) {
    return <p>Loading...</p>;
  }
  if (pending_apps.isError) {
    return (
      <p className="text-red-700">
        {pending_apps.message || "failed to fetch tasks"}
      </p>
    );
  }

  return (
    <>
      <section>
        {/* Alert Box */}
        {alert.active && 
          <div className={`${alert.success?"bg-green-200":"bg-red-200"}`}>{alert.message}</div>
        }

        {/* Task heading */}
        <div className="flex items-center gap-4">
          <ListTodoIcon />
          <TypoH2 className="pb-0">Tasks</TypoH2>
        </div>

        {/* pending apps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {pending_apps.data?.length ? (
            pending_apps.data.map((app) => 
            // CARD
            <TaskCard key={app.id} app={app} setModelActive={setModelActive} />
          )) : (
            <p>No Pending APPS</p>
          )}
        </div>
      {/* Model */}
          { model.active &&
            <Model clear={closeModel}>
              <div className="flex flex-col justify-start px-6 py-4 *:w-fit">
                  <TypoH4>Upload ScreenShot</TypoH4>
                  <input type="file" title="upload screenshot" id="uploadScreenShotFile"/>
                  <button 
                    className="px-4 py-1 bg-slate-800 text-slate-50 hover:bg-slate-900"
                    onClick={(e)=>handleImageUpload(e, 'uploadScreenShotFile', model.appId)}
                  >
                    upload
                  </button>
              </div>
              <div className="flex flex-col justify-start px-6 py-4 *:w-fit">
                  <TypoH4>ScreenShot Url</TypoH4>
                  <input type="url" title="screenshot url" placeholder="url of ss" id="tempUrlOfScreenShot"/>
                  <button 
                    className="px-4 py-1 bg-slate-800 text-slate-50 hover:bg-slate-900"
                    onClick={(e)=>handleDownload(model.appId, document.getElementById('tempUrlOfScreenShot').value)}
                  >
                    upload
                  </button>
              </div>

            </Model>
          }


      </section>
    </>
  );
}
