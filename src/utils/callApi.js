export const callApi = async (url, method, body) => {
  const baseURL = "http://localhost:3000";
  if (!url) {
    throw "URL is required";
  }

  try {
    const config = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      // Only include the body for non-GET requests
      ...(method !== "GET" ? { body: JSON.stringify(body || {}) } : {}),
    };

    console.log("fetch config", config);
    const response = await fetch(baseURL + url, config);

    // Check if the response is ok (status code 2xx)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("fetch response", data);
    return data;
  } catch (error) {
    console.log(error, "error in fetching data");
    if (error.message.includes("401")) {
      return { error: "Unauthorized", details: error };
    }
    return { error: "Fetch error", details: error };
  }
};
