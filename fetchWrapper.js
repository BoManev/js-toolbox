// caller should handle the rejection

function fetchJSON(...args) {
    return fetch(...args)
    .then(response => {
        if (!response.ok) {
            throw new FetchError(response);
        }
        return response.json();
    });
}

function fetchText(...args) {
    return fetch(...args)
    .then(response => {
        if (!response.ok) {
            throw new FetchError(response);
        }
        return response.text();
    });
}
