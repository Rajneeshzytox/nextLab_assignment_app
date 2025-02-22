// WARN: i dont have much time to finish project on time, so i am not writing general seperate components & any styling, clean code... just trying to finish with basic ui but fully working...

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AppTable from "./AppTable";

import uploadImage from "../../api/img_upload";

import {
  createAppThunk,
  fetchAllAppsThunk,
  deleteAppThunk,
  updateAppThunk,
} from "../../states/AdminStates/appsSlices";

//fetech categorie & sub catgeories
import { fetchALLCategories } from "../../states/AdminStates/categoriesSlice";
import { fetchALLSubCategories } from "../../states/AdminStates/subCategoriesSlices";

import { NavLink } from "react-router-dom";

// date format
import dateFormat, { masks } from "dateformat";
// {dateFormat(date, "dddd, mmmm dS, yyyy, h:MM TT")}

// typo
import { TypoH2 } from "../../components/ui/Typo";

function CreateAppForm({ categories, subCategories }) {
  const dispatch = useDispatch();

  // states : for create
  const [title, setTitle] = useState("");
  const [Points, setPoints] = useState(0);
  const [Img, setImg] = useState("");
  const [Url, setUrl] = useState("");
  const [SelectedCategories, setSelectedCategories] = useState("");
  const [SelectedSubCategoies, setSelectedSubCategoies] = useState("");
  const [IsActive, setIsActive] = useState(false);

  // image upload (working in my system though):
  const handleImageUpload = async (e, fileId) => {
    e.preventDefault();
    e.target.value = "uploading...";

    const res = await uploadImage(fileId);
    if (res.status == 200) {
      e.target.value = "upload successfully";
      setImg(res.imgUrl);
      return;
    }
    e.target.value = "failed to upload";
    alert(res.message);
  };

  //   clear state :
  const clearForm = () => {
    setTitle("");
    setPoints(0);
    setImg("");
    setUrl("");
    setSelectedCategories("");
    setSelectedSubCategoies("");
    setIsActive(false);
  };

  //   HAndle Submit
  const handleAppFormSubmit = (e) => {
    e.preventDefault();
    const app_json_object = {
      title: title,
      points: Points,
      img: Img,
      url: Url,
      categories_ids: [SelectedCategories],
      sub_categories_ids: [SelectedSubCategoies],
      is_active: IsActive,
    };
    dispatch(createAppThunk(app_json_object));
  };

  return (
    <>
      {/* Create apps */}
      <section>
        <TypoH2>ADD Apps</TypoH2>

        <form className="flex flex-col justify-start outline gap-2 *:w-fit px-6 py-4 my-4 rounded-md lg:grid lg:grid-cols-2">
          {/* screenshot */}
          {Img ? (
            <button onClick={() => setImg("")}>Change Image</button>
          ) : (
            <div className="flex flex-col w-fit">
              <label>
                Upload Img:
                <input type="file" id="create-app-img" title="upload img" />
              </label>
              <button className="bg-gray-300 rounded-lg px-2 py-1" onClick={(e) => handleImageUpload(e, "create-app-img")}>
                
                upload
              </button>
            </div>
          )}
          {Img && <img src={Img} className="w-14" />}

          {/* title */}
          <label>
            Title*:
            <input
              type="text"
              placeholder="Title*"
              title="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {/* Points */}
          <label>
            Points:
            <input
              type="number"
              min="0"
              placeholder="Points"
              title="Points"
              value={Points}
              onChange={(e) => setPoints(e.target.value)}
              required
            />
          </label>
          {/* url */}
          <label>
            Url*:
            <input
              type="url"
              placeholder="Url*"
              title="Url"
              value={Url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          {/* categories */}
          <label>
            Categories:
            {categories.data.length ? (
              <select
                onChange={(e) => setSelectedCategories(e.target.value)}
                value={SelectedCategories}
              >
                {/* NUll option */}
                <option value={""}>None</option>

                {/* render all categories options  */}
                {categories.data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            ) : (
              <NavLink to="/admin/sub-categories">Add SUb Categories</NavLink>
            )}
          </label>

          <label>
            Sub Categories:
            {/* sub categories */}
            {subCategories.data.length ? (
              <select
                onChange={(e) => setSelectedSubCategoies(e.target.value)}
                value={SelectedSubCategoies}
              >
                {/* NUll option */}
                <option value={""}>None</option>

                {/* render all categories options  */}
                {subCategories.data.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.title}
                  </option>
                ))}
              </select>
            ) : (
              <NavLink to="/admin/categories">Add Categories</NavLink>
            )}
          </label>

          {/* is active */}
          <label>
            is app is public?:
            <input
              type="checkbox"
              placeholder="is active"
              title="is active"
              onChange={() => setIsActive((p) => !p)}
            />
          </label>

          {/* submit */}
          <button className="bg-gray-300 rounded-lg px-2 py-1" type="submit" onClick={(e) => handleAppFormSubmit(e)}>
            add app
          </button>
        </form>
      </section>
    </>
  );
}

export default function AppsList() {
  const dispatch = useDispatch();

  // redux state
  const categories = useSelector((s) => s.categories);
  const subCategories = useSelector((s) => s.subCategories);

  // HEY NEVER REMOVE This STATE AS tHERE WILL BE INFINITE REQUEST CALLS
  const [Limit_fetch, setLimit_fetch] = useState(2);

  // fetch sub-cat / cat. if not loadeed
  useEffect(() => {
    if (subCategories.data.length == 0 && Limit_fetch > 0) {
      setLimit_fetch((p) => p - 1);
      dispatch(fetchALLSubCategories());
    }
    if (categories.data.length == 0 && Limit_fetch > 0) {
      setLimit_fetch((p) => p - 1);
      dispatch(fetchALLCategories());
    }
  }, [dispatch, subCategories.data, categories.data.length]);

  return (
    <>
      <section>
        <CreateAppForm categories={categories} subCategories={subCategories} />
        <AppTable/>
      </section>
    </>
  );
}
