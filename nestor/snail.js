// Function to modify
function snail(m) {
    if (!m || m.length < 1 || m[0].length < 1) {
        return [];
    }

    const length = m.length * m[0].length;

    // try to preallocate the resulting array
    // let res = Array.from({ length }, () => 0);
    let res = []; res.length = length;
    let i = 0;
    let j = 0;
    let maxJ = m[0].length - 1;
    let maxI = m.length - 1;
    let minJ = 0;
    let minI = 0;
    let dj = 1;
    let di = 0;

    for (let cnt = 0; cnt < length; cnt++) {
        if (dj > 0 && j > maxJ) {
            j = maxJ;
            dj = 0;
            di = 1;
            minI++;
            i = minI;
        } else if (di > 0 && i > maxI) {
            i = maxI;
            dj = -1;
            di = 0;
            maxJ--;
            j = maxJ;
        } else if (dj < 0 && j < minJ) {
            j = minJ;
            dj = 0;
            di = -1;
            maxI--;
            i = maxI;
        } else if (di < 0 && i < minI) {
            i = minI;
            dj = 1;
            di = 0;
            minJ++;
            j = minJ;
        }


        const el = m[i][j];

        res[cnt] = el;

        if (cnt >= length - 1) break;

        i += di;
        j += dj;
    }

    return res;
}

function main() {
    const m = [
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5]
    ];

    const res = snail(m);
    console.log({ res });
}

main();

module.exports = snail;
