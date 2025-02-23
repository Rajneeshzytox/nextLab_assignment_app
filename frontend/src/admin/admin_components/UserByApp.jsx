import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// fetch user async thunk
import { fetchUserByApp } from "../../states/AdminStates/appByUserSlice";

// assign points
import { verifyDownload } from "../../api/Admin_api/verifyDownload";

import dateFormat from "dateformat";

// model
import AssignModel from "./AssignModel";

// 404 page
// import PAGE_404 from "../../components/utils/Not_Found_404";

export default function UserByApp() {
  const params = useParams();
  const dispatch = useDispatch();

  // app state
  const app_users = useSelector((s) => s.userByApp);

  // app id from url
  const appId = params.appId;

  // MOdel State
  const [SuccessMessage, setSuccessMessage] = useState({
    active: false,
    message: "",
    success: false,
  });
  const [verifyModel, setVerifyModel] = useState({
    active: false,
    imgUrl: "",
    userId: "",
  });

  // load users by app
  const [Limit_fetch, setLimit_fetch] = useState(2);

  useEffect(() => {
    // fetch users
    if (app_users.data.length == 0 && Limit_fetch > 0) {
      setLimit_fetch((p) => p - 1);
      dispatch(fetchUserByApp({ appId: appId, urlParameter: null }));
    }
  }, [dispatch, app_users.data, appId]);

  // loadign
  if (app_users.isLoad) {
    return <p>Loading...</p>;
  }
  // error
  if (app_users.isError) {
    return <p>Error while loading users</p>;
  }

  // handle Verify, set Model active, assign values to state verifyModel
  const handleVerify = (id, url) => {
    setVerifyModel({
      active: true,
      imgUrl: url,
      userId: id,
    });
  };

  const handleAssign = async () => {
    if (appId && verifyModel.userId) {
      // verify if download
      const res = await verifyDownload(verifyModel.userId, appId);

      if (res.status == 200) {
        setSuccessMessage({
          active: true,
          message: res.message,
          success: true,
        });

        // after success close model:
        setVerifyModel({
          active: false,
          imgUrl: "",
          userId: "",
        });
      }

      // if failed
      setSuccessMessage({
        active: true,
        message: res.message,
        success: false,
      });
    }

    alert("user id or app id missing..");
  };

  return (
    <>
      <div>
        <h2>User List of {appId}</h2>

        <div className="relative max-w-[900px] mx-auto overflow-x-scroll my-8">
          {app_users.data.length == 0 ? (
            <p>No One Downloaded Your App, 😢</p>
          ) : (
            <table
              className="
          *:*:border-b *:*:border-slate-700
          *:*:*:px-4 *:*:*:py-2 *:*:*:text-nowrap *:*:*:whitespace-nowrap"
            >
              {/* Table body */}
              <thead>
                <tr>
                  <th>userID</th>
                  <th>username</th>
                  <th>points_earned</th>
                  <th>date</th>
                  <th>is_verified</th>
                </tr>
              </thead>

              {/* tabele body  */}
              <tbody>
                {app_users.data.map((user) => (
                  <tr key={user.id}>
                    {/* userID */}
                    <td>{user.userID}</td>

                    {/* username */}
                    <td>{user.username}</td>

                    {/* points */}
                    <td>{user.points_earned}</td>

                    {/* date created */}
                    <td>
                      {dateFormat(
                        new Date(user.date),
                        "dddd, mmmm dS, yyyy, h:MM TT"
                      )}
                    </td>

                    {/* IS VeRIFIED, if not verified then show verify btn */}
                    <td>
                      {user.is_verified ? (
                        <span className="bg-green-300 px-2">verified</span>
                      ) : (
                        <button
                          className="bg-blue-300 px-2"
                          onClick={() =>
                            handleVerify(user.userID, user.user_screenshot)
                          }
                        >
                          verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <AssignModel state={{ value: verifyModel, set: setVerifyModel }}>
        <div className="flex flex-col items-center gap-4 w-full sm:w-[300px] lg:w-[600px] py-4">
          {verifyModel.imgUrl ? (
            <img src={verifyModel.imgUrl} />
          ) : (
            <p>Not Provided Screenshot</p>
          )}

          <button
            className="bg-slate-200 border-2 border-slate-600 transition-all text-slate-900  hover:text-slate-50 hover:bg-slate-600 py-1 rounded px-2"
            title="assign point to this user?"
            onClick={() => handleAssign()}
          >
            assign points
          </button>
        </div>
      </AssignModel>

      {/* ALERT MESSAGE  */}
      {SuccessMessage.active && (
        <div className={`px-4 py-1 bg-slate-300 flex gap-8 items-center`}>
          {SuccessMessage.message}

          <button
            className={`px-4 py-1 bg-slate-100 flex gap-8 items-center`}
            onClick={() =>
              setSuccessMessage((p) => ({ ...p, active: false, message: "" }))
            }
          >
            ..ok
          </button>
        </div>
      )}
    </>
  );
}
