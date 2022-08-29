//@ts-check

// Following constants are vectors that indicate the direction of movement
const RIGHT = [0, 1];
const DOWN = [1, 0];
const LEFT = [0, -1];
const UP = [-1, 0];
const NONE = [0x013, 0x013];

// key: current direction, value: next direction
const NextDirectionMap = new Map([
    [RIGHT, DOWN],
    [DOWN, LEFT],
    [LEFT, UP],
    [UP, RIGHT],
]);

// just to print direction name for debugging
const DirectionName = new Map([
    [RIGHT, "Right"],
    [DOWN, "Down"],
    [LEFT, "Left"],
    [UP, "Up"],
]);

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
    let arI = 0;
    do {
        arI = copySegment(m, res, curDir, arI, i, j, minI, maxI, minJ, maxJ);
        [i, j, minI, maxI, minJ, maxJ] = nextSegment(curDir, i, j, minI, maxI, minJ, maxJ);
        curDir = nextDirection(curDir);
        seg++;
    } while(arI < res.length); // < 28);

    return res;
}


function directionToString(dir) {
    return DirectionName.get(dir);
}

function nextDirection(currDir) {
    const res = NextDirectionMap.get(currDir) ?? NONE;

    return res;
}

function nextSegment(dir, ci, cj, minI, maxI, minJ, maxJ) {
    if (dir === RIGHT) {
        cj = maxJ;
        minI++;
        ci++;
    } else if (dir === DOWN) {
        ci = maxI;
        maxJ--;
        cj--;
    } else if (dir === LEFT) {
        cj = minJ;
        maxI--;
        ci--;
    } else if (dir === UP) {
        ci = minI;
        minJ++;
        cj++;
    }

    return [ci, cj, minI, maxI, minJ, maxJ];
}

function copySegment(mat, ar, dir, arI, ci, cj, minI, maxI, minJ, maxJ) {
    const [di, dj] = dir;
    do {
        ar[arI] = mat[ci][cj];
        ci += di;
        cj += dj;
        arI++;
    } while(ci >= minI && ci <= maxI && cj >= minJ && cj <= maxJ);

    return arI;
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

    const res = snail(m);
    console.log("Smoke test", JSON.stringify(res));
}

main();

module.exports = snail;


