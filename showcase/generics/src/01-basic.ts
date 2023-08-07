type MyGenericType<TData> = {
    data: TData;
}
type Example = MyGenericType<{
    firstName: string;
}>;


// typesafe containers
const set = new Set<number>();
set.add(1);
// set.add("abc");


// inferring types
const addIdToObject = <TObj>(obj: TObj) => {
    return {
        ...obj,
        id: "123"
    }
}
const result = addIdToObject({
    firstName: "Bo",
    lastName: "M"
});
console.log(result.id);

// defaults
const createSet = <T = string>() => {
    return new Set<T>();
}

const strSet = createSet();
const numberSet = createSet<number>();