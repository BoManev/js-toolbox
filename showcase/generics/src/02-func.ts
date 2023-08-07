const makeFetch = <TData>(url: string): Promise<TData> => {
    return fetch(url).then((res) => res.json());
}

makeFetch<{
    firstName: string; lastName: string;
}>("/api/endpoint").then((res) => {
    console.log(res);
})