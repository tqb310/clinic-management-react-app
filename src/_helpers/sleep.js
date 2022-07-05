export default function sleep(ms, asyncTask) {
    return new Promise((rs, rj) => {
        setTimeout(() => {
            rs(asyncTask());
        }, ms);
    });
}
