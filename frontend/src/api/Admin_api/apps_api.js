import {API_Routes, API_Headers} from "../api_base"


// Fetch all app (READ):
export const fetchApps = async () => {
    try {
        const res = await fetch(API_Routes.apps, {
            headers: API_Headers
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to fetch apps" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while fetching apps" };
    }
};

// Create app:
export const createApp = async (appData) => {
    try {
        const res = await fetch(API_Routes.apps, {
            method: "POST",
            headers: API_Headers,
            body: JSON.stringify(appData)
        });

        if (res.ok) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        return { status: 400, message: "Failed to create app" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while creating app" };
    }
};

// Update app:
export const updateApp = async (id, updatedData) => {
    try {
        const res = await fetch(`${API_Routes.apps}${id}/`, {
            method: "PUT",
            headers: API_Headers,
            body: JSON.stringify(updatedData)
        });

        if (res.status == 200) {
            const res_data = await res.json();
            return { status: 200, data: res_data };
        }

        if (res.status == 404) {
            return { status: 400, message: "invalid id"};
        }

        return { status: 400, message: "Failed to update app" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while updating app" };
    }
};


export const deleteApp = async (id) => {
    try {
        const res = await fetch(`${API_Routes.apps}${id}/`, {
            method: "DELETE",
            headers: API_Headers
        });

        if (res.status == 204) {
            return { status: 200, data: {id:id}};
        }
        if (res.status == 404) {
            return { status: 400, message: "invalid id"};
        }

        return { status: 400, message: "Failed to delete app" };
    } catch (error) {
        console.log(error);
        return { status: 400, message: "An error occurred while deleting app" };
    }
};



/* 
API GUIDE: 

GET : 200: 
[
  {
    "id": 1,
    "title": "app-2",
    "points": 0,
    "img": null,
    "url": "http://google.com",
    "categories": [{id: '', title: '', ...}, ...],
    "sub_categories": [{id: '', title: '', ...}, ...],
    "is_active": true,
    "date_created": "2025-02-14"
  },
  ...
]


//  ----------- Update PUT/PATCH --------------
Put: .../api/apps/15/
{
    "title": "testt",  // -- required
    "points": 16,
    "img": null,
    "url": "http://google.com", // -- required
    "categories_ids": [10, 11],
    "sub_categories_ids": [8,9],
    "is_active": true
}

response: 200 ok
{
  "id": 15,
  "title": "testt",
  "points": 16,
  "img": null,
  "url": "http://google.com",
  "categories": [
    {
      "id": 10,
      "title": "322532523",
      "date_created": "2025-02-21"
    },
    {
      "id": 11,
      "title": "ABC",
      "date_created": "2025-02-22"
    }
  ],
  "sub_categories": [
    {
      "id": 8,
      "title": "temp sub cat",
      "category": null,
      "date_created": "2025-02-21"
    },
    {
      "id": 9,
      "title": "test",
      "category": {
        "id": 11,
        "title": "ABC",
        "date_created": "2025-02-22"
      },
      "date_created": "2025-02-21"
    }
  ],
  "is_active": true,
  "date_created": "2025-02-22"
}


// ---------- DELETE -----------
req delete : ../api/apps/15/

res 204 No content: null

*/