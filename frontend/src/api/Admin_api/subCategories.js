import { API_Routes, API_Headers } from "../api_base";

// Fetch all categories (READ):
export const fetchSubCategories = async () => {
    try {
        const res = await fetch(API_Routes.subCategories, {
            headers: API_Headers
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to fetch sub categories" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while fetching sub categories, maybe your networkk is down" };
    }
};

// Create a new category (CREATE):
export const createSubCategory = async (categoryData) => {
    try {
        const res = await fetch(API_Routes.subCategories, {
            method: "POST",
            headers: API_Headers,
            body: JSON.stringify(categoryData)
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to create sub category" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while creating sub category" };
    }
};

// Update category (UPDATE):
export const updateSubCategory = async (categoryId, updatedData) => {
    try {
        const res = await fetch(`${API_Routes.subCategories}${categoryId}/`, {
            method: "PATCH",
            headers:API_Headers,
            body: JSON.stringify(updatedData)
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to update category" };
    } catch (error) {
        console.log(error);
        return { status: 500, message: "An error occurred while updating category" };
    }
};

// Delete a category (DELETE):
export const deleteSubCategory = async (categoryId) => {
    try {
        const res = await fetch(`${API_Routes.subCategories}${categoryId}`, {
            method: "DELETE",
            headers: API_Headers
        });

        if (res.ok) {
            return { status: 200, message: "Category deleted sub successfully" };
        }

        return { status: 400, message: "Failed to delete category" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while deleting sub category" };
    }
};
