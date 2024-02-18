type Task<T> = () => Promise<T>;
type TaskResult<T> = T extends Task<infer R> ? R : never;


const mapper =
    <T extends Task<any>[]>(concurrency: number, ...tasks: T): Promise<{
        [K in keyof T]: PromiseSettledResult<TaskResult<T[K]>>
    }> => new Promise((resolve) => {
        const count = tasks.length;
        const results = Array(count).fill(undefined) as { // PACKED_OBJECTS
            [K in keyof T]: PromiseSettledResult<TaskResult<T[K]>>
        };

        let cursor = 0;
        let resolved = 0;
        const next = () => {
            if (resolved === count) { resolve(results); return; }
            if (cursor === count) { return; }

            const index = cursor++;
            tasks[index]()
                .then(
                    (value) => { results[index] = { status: "fulfilled", value }; },
                    (reason) => { results[index] = { status: "rejected", reason }; },
                ).then(
                    () => {
                        resolved++
                        process.nextTick(next)
                    },
                );
        };

        while (concurrency-- > 0) next();
    });

const args: number[][] = [];
for (let i = 0; i < 20; i++) {
    args.push([i]);
}

function sq(num: number) {
    return new Promise(resolve => {
        console.log("start", num);
        setTimeout(() => {
            resolve(num * num);
        }, 500);
    })
}

const tasks = args.map(arg => () => sq(arg[0]));

(async () => {
    await mapper(3, ...tasks);
})();

