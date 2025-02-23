import { API_Headers, API_Routes } from "../api_base";

export const getAppUser = async (appId, urlParameter) => {
  // api url
  let get_user_url = `${API_Routes.userByApp}${appId}/`;

  // if parameter exist
  if (urlParameter) {
    get_user_url = `${API_Routes.userByApp}${appId}/${urlParameter}`;
  }

  console.log("at getAppUser.js > url: ", get_user_url);

  try {
    const res = await fetch(get_user_url, {
      headers: API_Headers,
    });

    if (res.ok) {
      const res_data = await res.json();
      if (res_data.status == "ok") {
        return { status: 200, data: res_data.data };
      }
    }

    alert("failed to get users some thign wrong...");
    return { status: 400 };
  } catch (error) {
    console.error(error);
    alert("failed to get users some thign wrong...");
    return { status: 400 };
  }
};
