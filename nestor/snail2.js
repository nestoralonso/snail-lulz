//@ts-check

// Following constants are vectors that indicate the direction of movement
/** @type [number, number]*/
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
    [NONE, "None"],
]);

/**
 * Traverses a matrix in a spiral pattern, returns the result as an array starting at 0, 0 clockwise direction
 *
 * @param {number[][]} m the source matrix
 * @returns {number[]}
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

    let arI = 0;
    do {
        arI = copySegment(m, res, curDir, arI, i, j, minI, maxI, minJ, maxJ);
        [i, j, minI, maxI, minJ, maxJ, curDir] = nextSegment(curDir, i, j, minI, maxI, minJ, maxJ);
    } while(arI < res.length);

    return res;
}


/**
 * @param {number[]} dir
 *
 * @returns {String} legible direction name
 */
function directionToString(dir) {
    return DirectionName.get(dir) ?? "Invalid";
}

/**
 * @param {[number, number]} currDir
 *
 * @returns {[number, number]}
 */
function nextDirection(currDir) {
    /** @type {[number, number]} */
    const res = NextDirectionMap.get(currDir) ?? NONE;

    return res;
}

/**
 * @param {[number, number]} dir
 * @param {number} ci current i position in the matrix
 * @param {number} cj current j position in the matrix
 * @param {number} minI minimum allowed i position in the matrix
 * @param {number} maxI maximum allowed i position in the matrix
 * @param {number} minJ minimum allowed j position in the matrix
 * @param {number} maxJ maximum allowed j position in the matrix
 *
 * @returns {[ci, number, number, number, number, number, number[]]}
 */
function nextSegment(dir, ci, cj, minI, maxI, minJ, maxJ) {
    const nextDir = nextDirection(dir);
    if (nextDir === DOWN) {
        cj = maxJ;
        minI++;
        ci++;
    } else if (nextDir === LEFT) {
        ci = maxI;
        maxJ--;
        cj--;
    } else if (nextDir === UP) {
        cj = minJ;
        maxI--;
        ci--;
    } else if (nextDir === RIGHT) {
        ci = minI;
        minJ++;
        cj++;
    }

    return [ci, cj, minI, maxI, minJ, maxJ, nextDir];
}

/**
 * @param {number[][]} mat matrix
 * @param {number[]} ar destination array
 * @param {[number, number]} dir delta vector of the current direction
 * @param {number} arI current index in the destination array
 * @param {number} ci current i position in the matrix
 * @param {number} cj current j position in the matrix
 * @param {number} minI minimum allowed i position in the matrix
 * @param {number} maxI maximum allowed i position in the matrix
 * @param {number} minJ minimum allowed j position in the matrix
 * @param {number} maxJ maximum allowed j position in the matrix
 */
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

    // const res = snail(m);

    const res = snail(matrixGenerator(10000, 10000));
    console.log("Smoke test", res);
}

main();
//If you want to try a larger array
function matrixGenerator(rows, cols) {
    const matrix = new Array(rows).fill(new Array(cols).fill(0));
    const res = matrix.map((row) =>
      row.map(() => Math.floor(Math.random() * 1000) * 1)
    );

    return res;
  }

module.exports = snail;


