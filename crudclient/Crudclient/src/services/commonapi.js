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


    const result = await response.json();


    if (!response.ok) {

        console.log("API ERROR:", result);

        throw result;

    }


    return result;
};


export default commonApi;