type RGB = [number, number, number];

const palette_old: Record<'red' | 'green' | 'blue', string | RGB> = {
    red: [255, 0 , 0],
    green: "#00ff00",
    blue: [0, 0, 255]
}

//palette_old.red.lastIndexOf(0);
palette_old.red;

if (Array.isArray(palette_old.red)) {
    palette_old.red.lastIndexOf(0);
    //           ^?
}

const palette_new = {
    red: [255, 0 , 0],
    green: "#00ff00",
    blue: [0, 0, 255]
} satisfies Record<'red' | 'green' | 'blue', string | RGB>;

palette_new.red.lastIndexOf(0);
//           ^?
