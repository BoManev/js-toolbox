type GetPromiseReturnType<T extends (...args: any) => any> =
    Awaited<ReturnType<T>>;

type Result = GetPromiseReturnType<
    () => Promise<{
        firstName: string;
        lastName: string;
        id: string;
    }>>

// constraint functions
const getKeyHigh = <TObj extends Record<string, number>>(obj: TObj): {
    key: keyof TObj;
    value: number;
} => {
    const keys = Object.keys(obj) as Array<keyof TObj>;

    let key: keyof TObj = keys[0];
    let value = obj[key];

    for (const k of keys) {
        if (obj[key] > value) {
            key = k;
            value = obj[key];
        }
    }

    return {
        key,
        value
    }
}

const res = getKeyHigh({
    a: 1,
    b: 2,
    c: 3
})

const key = res.key;
const value = res.value;

// multi generic with constraint
const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
    if (key === "bad") {
        throw Error("Don't access the bad key");
    }
    return obj[key];
}

const val = getValue({
    a: 1,
    b: "abc"
}, "a"
);