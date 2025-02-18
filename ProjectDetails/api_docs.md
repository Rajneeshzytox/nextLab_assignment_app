# API Docs

## endspoints

Auth: 
- `register/` : register `post`
- `login/` : login `post`
- `logout/` : logout `get`

Admin: 
- `apps/` : apps `CRUD`
- `categories/` : categories
- `sub-categories/` : sub-categories

App: 
- `history/` : user download history `get`
- `get-apps/` : all-apps `get`
- `get-apps/?not-claimed=true/`: retured not claimed apps `get`
- `profile/` : profile `get` `put` `delete`

System: 
- `download/<int:app_id>/` : download-app {reward points for downloading apps. if not already download or app inactive}


---

## API BASE URL

server url (host) : `http://127.0.0.1:8000/`

API_BASE : `http://127.0.0.1:8000/api`

## Auth
### Register API
Url =>>  API_BASE/`register/`

```
headers: 
    Content-Type: application/json
```

**Body `Post`** : 
```json
{
    "username": "temp4", // required
    "password": "1234abc@@", // required
    "first_name": "temp 4",
    "last_name": "last_name",
    "email": "email@email.com"
}
```

**Response: 200 ok**
```json
{
  "status": "ok",
  "message": "created user successfully",
  "token": "cceb7d1g3fha6fe85a86803cf164d3f0d6ec23de",
  "data": {
    "username": "temp",
    "first_name": "temp_first",
    "last_name": "temp_last",
    "email": "temp@temp.com"
  }
}
```

**Failed Req. (ERROR) `Response 200 ok`**: 
```json
{
  "status": "not",
  "errors": {
    "username": [
      "This field is required."
    ],
    "password": [
      "This field is required."
    ]
  }
}
```


### Login: 
url: `...api/login/`

```
headers: 
    Content-Type: application/json
```

Request Body `POST`:
```json
{
  "username": "temp2",
  "password": "1234abc@@"
}
```

Response `200 ok`:
```json
{
  "token": "f4f655dc0ef0g93dj9ea8cdd455b0b8636e57331"
}
```

Wrong Email/password `400 Bad Request`:
```json
{
  "non_field_errors": [
    "Unable to log in with provided credentials."
  ]
}
```
Empty/missing Email or password Response`400 Bad Request`:
```json 
{
  "username": [
    "This field is required."
  ],
  "password": [
    "This field is required."
  ]
}
```

### Logout : 
`GET`:  .../`api/logout`

Response `200 ok`:
```json 
{
  "status": "ok",
  "message": "Logged out successfully."
}
```


## Admin Actions: 

Response for non admin user `403 Forbidden`:  
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### Categories
url : ``.../api/categories/
``
#### GET Response  `200 ok`
```json
[
  {
    "id": 1,
    "title": "abcd",
    "date_created": "2025-02-17"
  },
  {
    "id": 2,
    "title": "cat-2",
    "date_created": "2025-02-17"
  }
]

```
#### Post
- Request :
    ```json
    {
    "title": "cat-3"
    }
    ```
- Response `201 created`
    ```json
    {
    "id": 3,
    "title": "cat-3", //required
    "date_created": "2025-02-18"
    }
    ```

#### Put/Patch
url `.../api/categories/3/`
- Req
    ```json
    {
    "title": "cat3"
    }
    ```
- Response `200 ok`:
    ```json
    {
    "id": 3,
    "title": "cat3",
    "date_created": "2025-02-18"
    }
    ```

#### Delete
url `.../api/categories/3/`

- Response ` 204 No Content` :
    `empty`

#### Invalid Id
url `.../api/categories/102/`

- Response ` 404 Not Found` :
    ```json 
    {
    "detail": "No Category matches the given query."
    }
    ```
---
### SUB Categories
url : ``.../api/sub-categories/`` -- `get` `post`

url `.../api/sub-categories/1/` -- [`get, patch, put, delete`]

#### GET Response  `200 ok`
```json
[
[
  {
    "id": 1,
    "title": "sub-cat-1",
    "category": {
      "id": 1,
      "title": "abcd",
      "date_created": "2025-02-14"
    },
    "date_created": "2025-02-14"
  },
  {
    "id": 2,
    "title": "sub-cat-2",
    "category": {
      "id": 1,
      "title": "abcd",
      "date_created": "2025-02-14"
    },
    "date_created": "2025-02-14"
  },
  {
    "id": 3,
    "title": "sub-cat-3",
    "category": null,
    "date_created": "2025-02-18"
  }
]
]

```
#### Post
- Request :
    ```json
    {
    "title": "category name", //required
    "category_id": 2
    }
    ```
- Response `201 created`
    ```json
    {
    "id": 7,
    "title": "category name", //required
    "category": {
        "id": 2,
        "title": "cat-2",
        "date_created": "2025-02-14"
    },
    "date_created": "2025-02-18"
    }
    ```

#### Put/Patch

- Req
    ```json
    {
      "title": "category name changed", //required in put
      "category_id": 1
    }
    ```
- Response `200 ok`:
    ```json
    {
    "id": 7,
    "title": "category name changed",
    "category": {
        "id": 1,
        "title": "abcd",
        "date_created": "2025-02-14"
    },
    "date_created": "2025-02-18"
    }
    ```

#### Delete

- Response ` 204 No Content` :
    `empty`

#### Invalid Id

- Response ` 404 Not Found` :
    ```json 
    {
    "detail": "No SubCategory matches the given query."
    }
    ```
---
### APPS
urls: 
- `/api/apps/` -- [`get`, `post`]
- `/api/apps/1/` -- [`get`, `put`, `patch`, `delete`]

#### GET 
```json
// /api/apps/: 
[
 [
  {
    "id": 1,
    "title": "app-2",
    "points": 0,
    "img": null,
    "url": "http://google.com",
    "categories": [
      {
        "id": 1,
        "title": "abcd",
        "date_created": "2025-02-14"
      }
    ],
    "sub_categories": [
      {
        "id": 1,
        "title": "sub-cat-1",
        "category": {
          "id": 1,
          "title": "abcd",
          "date_created": "2025-02-14"
        },
        "date_created": "2025-02-14"
      }
    ],
    "is_active": true,
    "date_created": "2025-02-14"
  },
  {
    "id": 2,
    "title": "app-1",
    "points": 5,
    "img": "http://127.0.0.1:8000/media/appImg/pic_raj.jpg",
    "url": "http://google.com",
    "categories": [
      {
        "id": 2,
        "title": "cat-2",
        "date_created": "2025-02-14"
      }
    ],
    "sub_categories": [
      {
        "id": 1,
        "title": "sub-cat-1",
        "category": {
          "id": 1,
          "title": "abcd",
          "date_created": "2025-02-14"
        },
        "date_created": "2025-02-14"
      }
    ],
    "is_active": true,
    "date_created": "2025-02-14"
  }
]
]

```

```json
// /api/apps/1/
{
  "id": 1,
  "title": "app-2",
  "points": 0,
  "img": null,
  "url": "http://google.com",
  "categories": [
    {
      "id": 1,
      "title": "abcd",
      "date_created": "2025-02-14"
    }
  ],
  "is_active": true,
  "date_created": "2025-02-14"
}
```

#### POST
- Req: 
    ```json
    {
    "title": "facebook", //required
    "points": 10,
    "img": null, 
    "url": "http://facebook.com", //required
    "categories_ids": [1,2],
    "sub_categories_ids": [1,2]
    }
    ```

- Response 
    ```json
    {
    "id": 1,
    "title": "facebook",
    "points": 10,
    "img": null,
    "url": "http://facebook.com",
    "categories": [
        {
        "id": 1,
        "title": "Social Media",
        "date_created": "2025-02-14"
        },
        {
        "id": 2,
        "title": "Website",
        "date_created": "2025-02-14"
        }
    ],
    "sub_categories": [
        {
        "id": 1,
        "title": "connections",
        "category": {
            "id": 1,
            "title": "abcd",
            "date_created": "2025-02-14"
        },
        "date_created": "2025-02-14"
        },
        {
        "id": 2,
        "title": "marketing",
        "category": {
            "id": 1,
            "title": "abcd",
            "date_created": "2025-02-14"
        },
        "date_created": "2025-02-14"
        }
    ],
    "is_active": true,
    "date_created": "2025-02-18"
    }
    ```

... and so on for PUT / Patch / Delete...


and again so on, so on... 