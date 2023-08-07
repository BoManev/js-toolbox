// const typedObjectKeys = <TObj extends {}>(obj: TObj): Array<keyof TObj> => {
//     return Object.keys(obj);
// }

const typedObjectKeys = <TObj extends {}>(obj: TObj) => {
    return Object.keys(obj) as Array<keyof TObj>;
}

const obj = typedObjectKeys({
    name: "John",
    age: 30
});