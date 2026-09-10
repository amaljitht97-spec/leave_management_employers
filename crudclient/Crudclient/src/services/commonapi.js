const commonApi = async (
    url,
    method,
    data = {},
    headers = {}
) => {

    const options = {
        method: method,
        headers: headers
    };

    if (method !== "GET" && method !== "DELETE") {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    // Read response safely
    const contentType = response.headers.get("content-type") || "";

    let result;

    if (contentType.includes("application/json")) {
        result = await response.json();
    } else {
        result = await response.text();
    }

    if (!response.ok) {

        console.log("API STATUS:", response.status);
        console.log("API URL:", url);
        console.log("API ERROR:", result);

        throw result;
    }

    return result;
};

export default commonApi;