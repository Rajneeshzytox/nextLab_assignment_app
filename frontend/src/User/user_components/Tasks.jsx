// state
import { useSelector, useDispatch } from "react-redux";
import { fetch_not_claimed_apps } from "../../states/UserStates/apps_not_claimed";

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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// task Card
export function TaskCard({ app }) {
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
            <button className="w-fit px-6 hover:bg-slate-950 bg-slate-700 text-slate-100 rounded">
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

  useEffect(() => {
    if (pending_apps.data.length == 0) {
      alert("fetching tasks,");
      dispatch(fetch_not_claimed_apps());
    }
  }, [pending_apps.data]);

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
        {/* Task heading */}
        <div className="flex items-center gap-4">
          <ListTodoIcon />
          <TypoH2 className="pb-0">Tasks</TypoH2>
        </div>

        {/* pending apps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          {pending_apps.data?.length ? (
            pending_apps.data.map((app) => <TaskCard key={app.id} app={app} />)
          ) : (
            <p>No Pending APPS</p>
          )}
        </div>
      </section>
    </>
  );
}
