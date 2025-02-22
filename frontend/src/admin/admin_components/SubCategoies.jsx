import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchALLSubCategories,
  createSubCategoryThunk,
  deleteSubCategoryThunk,
  updateSubCategoryThunk,
} from "../../states/AdminStates/subCategoriesSlices";
import { fetchALLCategories } from "../../states/AdminStates/categoriesSlice";
import { NavLink } from "react-router-dom";

// date format 
import dateFormat, { masks } from "dateformat"
// {dateFormat(date, "dddd, mmmm dS, yyyy, h:MM TT")}

export default function SubCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.categories);
  const { data, isLoad, isError, message } = useSelector(
    (s) => s.subCategories
  );

  // state
  const [editMode, setEditMode] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  // for update
  const [title, setTitle] = useState("");
  const [selectedCategory_forUpdate, setSelectedCategory_forUpdate] =
    useState(null);

  // HEY NEVER REMOVE This STATE AS tHERE WILL BE INFINITE REQUEST CALLS
  const [Limit_fetch, setLimit_fetch] = useState(2);

  // Fetch categories if not already loadded
  useEffect(() => {
    // if sub-categories is not loaded
    if (data.length == 0 && Limit_fetch > 0) {
      setLimit_fetch((p) => p - 1);
      dispatch(fetchALLSubCategories());
    }

    // if categories is not loaded
    if (categories.data.length == 0 && Limit_fetch > 0) {
      console.log("fetching the categories, limit: ", Limit_fetch);
      setLimit_fetch((p) => p - 1);
      dispatch(fetchALLCategories());
    }
  }, [dispatch, data]);

  // add sub categories
  const handleAddSubCategory = (title, categoryId) => {
    if (title != "") {
      if (categoryId) {
        dispatch(
          createSubCategoryThunk({ title: title, category_id: categoryId })
        );
      } else {
        dispatch(createSubCategoryThunk({ title: title }));
      }
      setNewTitle("");
      setSelectedCategory(null)
      return;
    }
    alert("enter title first ");
  };

  // deletion sub categories
  const handleDeleteSubCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this sub category?")) {
      dispatch(deleteSubCategoryThunk(id));
    }
  };

  // update/EDIT  & save
  const handleEditClick = (subCategory) => {
    setEditMode(subCategory.id);
    setTitle(subCategory.title);
    setSelectedCategory_forUpdate(subCategory.category.id || null);
  };

  const handleSaveClick = (id) => {
    if (title != "") {
      if(selectedCategory_forUpdate){
        dispatch(updateSubCategoryThunk({
          id: id,
          data: {
            title: title,
            category_id: selectedCategory_forUpdate
          } 
        }));

      } else {
        dispatch(updateSubCategoryThunk({
          id: id,
          data: {title: title}
        }));
      }
      
      // sett to dflt
      exitEditMode();
      return;
    }
    alert("enter something first ");
  };

  // exit edit mode
  const exitEditMode = () => {
    setEditMode(null);
    setSelectedCategory_forUpdate(null)
    setTitle("");
  };

  // if load
  if (isLoad) {
    return <p>Loading...</p>;
  }

  // if err
  if (isError) {
    return <p>Error: {message}</p>;
  }

  return (
    <div>
      <h2>Sub Categories</h2>

      {/* add sub category */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter Sub category"
          title="Add SUb Category Title"
          className="outline"
        ></input>

        {/* select Category  */}

        {categories.data.length ? (

          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory || ''}
          >
            {/* NUll option */}
            <option value='' >None</option>

            {/* render all categories options  */}
            {categories.data.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.title}
              </option>
            ))}
            
          </select>
        ) : (
          <NavLink to="/admin/categories">Add Categories</NavLink>
        )}

        <button
          onClick={() => handleAddSubCategory(newTitle, selectedCategory)}
        >
          add category
        </button>
      </div>

      <div className="max-w-[900px] mx-auto overflow-x-scroll my-8">
        {/* if data available then map */}
        {data.length == 0 ? (
          <p>Looks like no sub Categories</p>
        ) : (
          <table className='
            *:*:border-b *:*:border-slate-700
            *:*:*:px-4 *:*:*:py-2 *:*:*:text-nowrap *:*:*:whitespace-nowrap'
          >
            {/* HEAD TABLE */}
            <thead>
              <tr className="*:pr-10">
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date Created</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            {/* BODY TABLE */}
            <tbody>
              {data.map((subCategory) => (
                <tr key={subCategory.id}>
                  {/* id */}
                  <td>{subCategory.id}</td>
                  {/* if edit mode then input other wise text */}
                  <td>
                    {editMode == subCategory.id ? (
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="enter new title"
                        title="edit sub Category"
                        className="outline"
                      />
                    ) : (
                      subCategory.title
                    )}
                  </td>
                  {/* category of sub category */}
                  <td>
                    {editMode == subCategory.id ? (
                      <select 
                        value={selectedCategory_forUpdate || '' }
                        onChange={(e) => setSelectedCategory_forUpdate(e.target.value)}
                      >
                        <option value="">
                            None
                        </option>

                        {/* rendering all categories option */}
                        {categories.data.map((category) => (
                          <option
                            key={category.id}
                            value={category.id}
                          >
                            {category.title}
                          </option>
                        ))}
                      </select>
                    ) : 
                    subCategory.category ? (
                      subCategory.category.title
                    ) : (
                      "none"
                    )}
                  </td>

                  {/* date  */}
                  <td>
                    {/* {new Date(subCategory.date_created).toLocaleDateString()} */}
                    {dateFormat(new Date(subCategory.date_created), "dddd, mmmm dS, yyyy, h:MM TT")}
                  </td>

                  {/* update */}
                  <td>
                    {editMode === subCategory.id ? (
                      <>
                        <button onClick={() => handleSaveClick(subCategory.id)}>
                          Save
                        </button>
                        <button onClick={() => exitEditMode()}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => handleEditClick(subCategory)}>
                        Update
                      </button>
                    )}
                  </td>

                  {/* delete */}
                  <td>
                    <button
                      onClick={() => handleDeleteSubCategory(subCategory.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
