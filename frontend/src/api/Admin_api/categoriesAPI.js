import { API_Routes, API_Headers } from "../api_base";

// Fetch all categories (READ):
export const fetchCategories = async () => {
    try {
        const res = await fetch(API_Routes.categories, {
            headers: API_Headers
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to fetch categories" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while fetching categories" };
    }
};

// Create a new category (CREATE):
export const createCategory = async (categoryData) => {
    try {
        const res = await fetch(API_Routes.categories, {
            method: "POST",
            headers: API_Headers,
            body: JSON.stringify(categoryData)
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to create category" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while creating category" };
    }
};

// Update category (UPDATE):
export const updateCategory = async (categoryId, updatedData) => {
    try {
        // console.log("running update api js,", `${API_Routes.categories}${categoryId}/`, "\ndata is ", updatedData)
        const res = await fetch(`${API_Routes.categories}${categoryId}/`, {
            method: "PUT",
            headers: API_Headers,
            body: JSON.stringify(updatedData)
        });

        if (res.status == 200) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to update category" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while updating category" };
    }
};

// Delete a category (DELETE):
export const deleteCategory = async (categoryId) => {
    try {
        const res = await fetch(`${API_Routes.categories}${categoryId}/`, {
            method: "DELETE",
            headers: API_Headers
        });

        if (res.status == 204) {
            return { status: 200, data: {id:categoryId}};
        }

        return { status: 400, message: "Failed to delete category" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while deleting category" };
    }
};
