import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchALLCategories, deleteCategoryThunk, updateCategoryThunk, createCategoryThunk } from '../../states/AdminStates/categoriesSlice';

export default function Categories(){
    const dispatch = useDispatch();
    const { data, isLoad, isError, message } = useSelector(s=>s.categories) ;

    // state 
    const [editMode, setEditMode] = useState(null)
    const [title, setTitle] = useState('')
    const [newTitle, setNewTitle] = useState('')

    // HEY NEVER REMOVE This STATE AS tHERE WILL BE INFINITE REQUEST CALLS
    const [Limit_fetch, setLimit_fetch] = useState(2)

    // Fetch categories if not already loadded
    useEffect(() => {
        if (data.length == 0 && Limit_fetch>0) {
            // alert("fetching categgories")
            setLimit_fetch(p=>p-1)
            dispatch(fetchALLCategories())
        }
    }, [dispatch, data])



    // add categories
    const handleAddCategory = (title) => {
        if (title != '') {
            dispatch(createCategoryThunk({title:title}));
            setNewTitle('')
            return
        }
        alert("enter something first ")
    }

    // deletion categories
    const handleDeleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            // alert("deleteign categories")
            dispatch(deleteCategoryThunk(id));
        }
    }

    // update/EDIT  & save 
    const handleEditClick = (category) => {
        // alert("running edit click")
        setEditMode(category.id)
        setTitle(category.title)
    }

    const handleSaveClick = (id) => {
        if (title != '') {
            // alert("running save click")
            dispatch(updateCategoryThunk({ id: id, data: {title: title} }))
            setEditMode(null)
            return
        }
        alert("enter something first ")
    };

    // exit edit mode 
    const exitEditMode = () => {
        setEditMode(null)
        setTitle('')
    }

    // if load
    if (isLoad) {
        return <p>Loading...</p>
    }

    // if err
    if (isError) {
        return <p>Error: {message}</p>
    }


    return (
        <div>
            <h2>Categories</h2>

            <div>
                <input value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter Category' title='Add Category Title' className='outline'></input>
                <button onClick={()=>handleAddCategory(newTitle)}>add category</button>
            </div>


            <div className="max-w-[900px] mx-auto overflow-x-scroll my-8">
            {/* if data available then map */}
            {data.length == 0 ? (
                <p>Looks like no Categories</p>
            ) : (
                <table>

                    {/* HEAD TABLE */}
                    <thead>
                        <tr className='*:pr-10'>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Date Created</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {/* BODY TABLE */}
                    <tbody>
                        {data.map((category) => (
                            <tr key={category.id}>

                                {/* id */}
                                <td>{category.id}</td>
                                {/* if edit mode then input other wise text */}
                                <td>
                                    {editMode == category.id ? (
                                        <input 
                                            type="text" 
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder='enter new title'
                                            title='edit category'
                                            className='outline'
                                        />
                                    ) : (
                                        category.title
                                    )}

                                </td>


                                {/* date  */}
                                <td>{new Date(category.date_created).toLocaleDateString()}</td>
                                
                                {/* update */}
                                <td>
                                    {editMode === category.id ? (
                                        <>
                                        <button onClick={() => handleSaveClick(category.id)}>Save</button>
                                        <button onClick={() => exitEditMode()}>Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditClick(category)}>Update</button>
                                    )}
                                </td>


                                {/* delete */}
                                <td>
                                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
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


