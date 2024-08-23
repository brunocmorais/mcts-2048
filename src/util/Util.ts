export const range = (count : number) =>
    [...Array(count).keys()];

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));