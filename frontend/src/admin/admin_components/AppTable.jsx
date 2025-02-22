import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

// for redux states
import { useDispatch, useSelector } from "react-redux"

// api call slice thunks
import {
  fetchAllAppsThunk,
  deleteAppThunk,
  updateAppThunk,
} from "../../states/AdminStates/appsSlices"


// date format 
import dateFormat, { masks } from "dateformat"
// {dateFormat(date, "dddd, mmmm dS, yyyy, h:MM TT")}



// APP TabLE SHOW COMPONENTS
export default function AppTable() {
// load app state 
  const dispatch = useDispatch()
  const { data, isLoad, isError, message } = useSelector((s) => s.apps)

// use States : 
  const [editMode, setEditMode] = useState(null)
  const [appIdToEdit, setAppIdToEdit] = useState(null)

  // for updates
  const [title, setTitle] = useState("")
  const [points, setPoints] = useState(0)
  const [url, setUrl] = useState("")
  const [isActive, setIsActive] = useState(true)


  // Fetch apps on load
  const [Limit_fetch, setLimit_fetch] = useState(2)
  useEffect(() => {
    if (data.length == 0 && Limit_fetch > 0) {
      setLimit_fetch((p) => p - 1)
      dispatch(fetchAllAppsThunk())
    }
  }, [dispatch, data])


//   EDIT set app values to states 
  const handleEditClick = (app) => {
    setAppIdToEdit(app.id)
    setTitle(app.title)
    setPoints(app.points)
    setUrl(app.url)
    setIsActive(app.is_active)
    setEditMode(true)
  }


  const handleSaveClick = () => {
    if (title !== "") {
      dispatch(updateAppThunk({
            id: appIdToEdit,
            data: { title, points, url, is_active: isActive },
        }))

      // after update exit edit
      setEditMode(false)
      return ;
    } 
    
    else {
      alert("Enter a valid title")
    }
  }

//   delete apps
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this app?")) {
      dispatch(deleteAppThunk(id))
    }
  }

//   if apps loading
if (isLoad) {
    return <p>Loading...</p>
}

//   if apps fetch failed
  if (isError) {
    return <p>Error: {message}</p>
  }



  return (
    <div>
      <h2>Apps List</h2>

      <div className="max-w-[900px] mx-auto overflow-x-scroll my-8">
        {data.length == 0 ? (
          <p>Looks like apps data, try to add one</p>
        ) : (
          <table
            className="
          *:*:border-b *:*:border-slate-700
          *:*:*:px-4 *:*:*:py-2 *:*:*:text-nowrap *:*:*:whitespace-nowrap"
          >
            {/* atble body */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Points</th>
                <th>Date Created</th>
                <th></th>
              </tr>
            </thead>

            {/* tabele body  */}
            <tbody>
            {
              data.map((app) => (

                <tr key={app.id}>
                    {/* id */}
                  <td>{app.id}</td>

                  {/* title */}
                  <td>
                    {/* if edit show input */}
                    {editMode && app.id == appIdToEdit ? (
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="outline"
                      />
                    ) : (
                    
                      <div className="flex items-center gap-2">
                        {/* if edit is off, title / icon */}
                        {app.img && (
                          <img
                            className="w-5"
                            src={app.img}
                            title={app.title}
                          />
                        )}
                        <p>{app.title}</p>
                      </div>
                    )}
                  </td>

                  {/* points */}
                  <td>
                    {editMode && app.id == appIdToEdit ? (
                      <input
                        value={points}
                        onChange={(e) => setPoints(Number(e.target.value))}
                        className="outline"
                      />
                    ) : (
                      app.points
                    )}
                  </td>

                  {/* date created */}
                  <td>
                    {dateFormat(
                      new Date(app.date_created),
                      "dddd, mmmm dS, yyyy, h:MM TT"
                    )}
                  </td>

                  {/* ALL Actions */}
                  <td>
                    {editMode && app.id == appIdToEdit ? (
                      <>
                        {/* save button  */}
                        <button onClick={handleSaveClick}>Save</button>

                        {/* cancel button */}
                        <button onClick={() => setEditMode(false)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                      {/* View all USer with app in history */}
                        <NavLink to={`/admin/apps/details/${app.id}`}>
                          <button className="bg-slate-200 py-1 px-2 rounded">
                            View
                          </button>
                        </NavLink>

                        {/* EDit mode */}
                        <button
                          onClick={() => handleEditClick(app)}
                          className="bg-slate-200 py-1 px-2 rounded ml-2"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="bg-slate-200 py-1 px-2 rounded ml-2"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
