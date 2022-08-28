//@ts-check
const RIGHT = [0, 1];
const DOWN = [1, 0];
const LEFT = [0, -1];
const UP = [-1, 0];
const NONE = [0x013, 0x013];

const DirectionsMap = new Map([
    [RIGHT, DOWN],
    [DOWN, LEFT],
    [LEFT, UP],
    [UP, RIGHT],
]);

const DirectionName = new Map([
    [RIGHT, "Right"],
    [DOWN, "Down"],
    [LEFT, "Left"],
    [UP, "Up"],
]);

function directionToString(dir) {
    return DirectionName.get(dir);
}

function nextDirection(currDir) {
    const res = DirectionsMap.get(currDir) ?? NONE;

    return res;
}

function printSegment(seg, dir, minI, maxI, minJ, maxJ) {
    const dirName = directionToString(dir);
    switch (dirName) {
        case "Right":
            console.log(`${seg}) ${dirName} => [${minI}, ${maxI}, ${minJ}, ${maxJ}]`);
            return;
        case "Down":
            console.log(`${seg}) ${dirName} => [${minI}, ${maxI}, ${minJ}, ${maxJ}]`);
            return;
        case "Left":
            console.log(`${seg}) ${dirName} => [${minI}, ${maxI}, ${minJ}, ${maxJ}]`);
            return;
        case "Up":
            console.log(`${seg}) ${dirName} => [${minI}, ${maxI}, ${minJ}, ${maxJ}]`);
            return;

        default:
            console.log(`Wuut`);
            return;
    }
}

function nextSegment(mat, ar, dir, arI, ci, cj, minI, maxI, minJ, maxJ) {
    if (dir === RIGHT) {
        for (let x = cj; x <= maxJ; x++) {
            ar[arI] = mat[ci][x];
            arI++;
        }
        cj = maxJ;
        minI++;
        ci++;
    } else if (dir === DOWN) {
        for (let x = ci; x <= maxI; x++) {
            ar[arI] = mat[x][cj];
            arI++;
        }
        ci = maxI;
        maxJ--;
        cj--;
    } else if (dir === LEFT) {
        for (let x = cj; x >= minJ; x--) {
            ar[arI] = mat[ci][x];
            arI++;
        }
        cj = minJ;
        maxI--;
        ci--;
    } else if (dir === UP) {
        for (let x = ci; x >= minI; x--) {
            ar[arI] = mat[x][cj];
            arI++;
        }
        ci = minI;
        minJ++;
        cj++;
    }

    return [arI, ci, cj, minI, maxI, minJ, maxJ];
}
// Function to modify
/**
 * @param {number[][]} m
 */
function snail(m) {
    if (!m || m.length < 1 || m[0].length < 1) {
        return [];
    }

    const length = m.length * m[0].length;

    // try to preallocate the resulting array
    let res = []; res.length = length;
    let i = 0;
    let j = 0;
    let maxJ = m[0].length - 1;
    let maxI = m.length - 1;
    let minJ = 0;
    let minI = 0;
    let curDir = RIGHT;

    let seg = 0;
    printSegment(seg, curDir, minI, maxI, minJ, maxJ);
    seg++;

    for (let cnt = 0; cnt < length; cnt++) {
        if (curDir === RIGHT && j > maxJ) {
            j = maxJ;
            minI++;
            i = minI;
            curDir = nextDirection(curDir);
            printSegment(seg, curDir, minI, maxI, minJ, maxJ);
            seg++;
        } else if (curDir === DOWN && i > maxI) {
            i = maxI;
            maxJ--;
            j = maxJ;
            curDir = nextDirection(curDir);
            printSegment(seg, curDir, minI, maxI, minJ, maxJ);
            seg++;
        } else if (curDir === LEFT && j < minJ) {
            j = minJ;
            maxI--;
            i = maxI;
            curDir = nextDirection(curDir);
            printSegment(seg, curDir, minI, maxI, minJ, maxJ);
            seg++;
        } else if (curDir === UP && i < minI) {
            i = minI;
            minJ++;
            j = minJ;
            curDir = nextDirection(curDir);
            printSegment(seg, curDir, minI, maxI, minJ, maxJ);
            seg++;
        }

        const el = m[i][j];
        res[cnt] = el;

        const [di, dj] = curDir;
        i += di;
        j += dj;
    }

    return res;
}

/**
 * @param {number[][]} m
 */
function snail2(m) {
    if (!m || m.length < 1 || m[0].length < 1) {
        return [];
    }

    const length = m.length * m[0].length;

    // try to preallocate the resulting array
    let res = []; res.length = length;
    let i = 0;
    let j = 0;
    let maxJ = m[0].length - 1;
    let maxI = m.length - 1;
    let minJ = 0;
    let minI = 0;
    let curDir = RIGHT;

    let seg = 0;
    let arI = 0;
    do {
        [arI, i, j, minI, maxI, minJ, maxJ] = nextSegment(m, res, curDir, arI, i, j, minI, maxI, minJ, maxJ);
        curDir = nextDirection(curDir);
        seg++;
    } while(arI < res.length); //< 28);

    return res;
}

function main() {
    const m = [
        [1, 2, 3, 4, 5],
        [46, 47, 48, 49, 6],
        [45, 84, 85, 50, 7],
        [44, 83, 86, 51, 8],
        [43, 82, 87, 52, 9],
        [42, 81, 88, 53, 10],
        [41, 80, 89, 54, 11],
        [40, 79, 90, 55, 12],
        [39, 78, 91, 56, 13],
        [38, 77, 92, 57, 14],
        [37, 76, 93, 58, 15],
        [36, 75, 94, 59, 16],
        [35, 74, 95, 60, 17],
        [34, 73, 96, 61, 18],
        [33, 72, 97, 62, 19],
        [32, 71, 98, 63, 20],
        [31, 70, 99, 64, 21],
        [30, 69, 100, 65, 22],
        [29, 68, 67, 66, 23],
        [28, 27, 26, 25, 24]
    ];

    const res = snail2(m);
    console.log("Smoke test", JSON.stringify(res));
}

// main();

module.exports = snail2;


