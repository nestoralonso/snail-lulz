//@ts-check
const snail = require("./nestor/snail2.js");

//If you want to try a larger array
function matrixGenerator(rows, cols) {
  const matrix = new Array(rows).fill(new Array(cols).fill(0));
  const res = matrix.map((row) =>
    row.map(() => Math.floor(Math.random() * 1000) * 1)
  );

  return res;
}

function timedFunc(func) {
  return function fun(...args) {
    const iniTime = new Date().getTime();
    const res = func(...args);
    const endTime = new Date().getTime();
    const totalTime = endTime - iniTime;
    console.log(`🦊 ${func.name} (${args.length}) ~ totalTime`, (totalTime / 1000));

    return res;
  }
}

const matrixGen = timedFunc(matrixGenerator);
const cases = [
  {
    name: "0x0 Matrix",
    input: () => [],
    output: [],
    enabled: true
  },
  {
    name: "1x1 Matrix",
    input: () => [[1]],
    output: [1],
    enabled: true
  },
  {
    name: "3x3 Matrix",
    input: () => [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5]
    ],
    output: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    enabled: true
  },
  {
    name: "4x4 Matrix",
    input: () => [
      [1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7]
    ],
    output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], enabled: true
  },
  {
    name: "5x5 Matrix",
    input: () => [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ],
    output: [
      1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13
    ],
    enabled: true
  },
  { name: "7x8 Matrix", input: () => [[996, 821, 450, 669, 76, 353, 952, 16], [344, 523, 196, 484, 426, 682, 433, 228], [28, 678, 244, 604, 256, 653, 247, 981], [573, 806, 828, 383, 383, 435, 803, 892], [991, 634, 751, 692, 353, 935, 422, 297], [142, 145, 837, 999, 879, 757, 974, 904], [629, 158, 359, 530, 233, 911, 65, 703]], "output": [996, 821, 450, 669, 76, 353, 952, 16, 228, 981, 892, 297, 904, 703, 65, 911, 233, 530, 359, 158, 629, 142, 991, 573, 28, 344, 523, 196, 484, 426, 682, 433, 247, 803, 422, 974, 757, 879, 999, 837, 145, 634, 806, 678, 244, 604, 256, 653, 435, 935, 353, 692, 751, 828, 383, 383], enabled: true },
  { name: "20x5 Matrix", input: () => [[312, 845, 869, 494, 667], [716, 660, 255, 130, 767], [121, 506, 480, 792, 334], [218, 639, 57, 434, 13], [14, 572, 501, 965, 729], [760, 359, 572, 123, 824], [275, 935, 466, 485, 721], [369, 892, 860, 334, 498], [968, 351, 177, 264, 542], [308, 574, 624, 823, 85], [246, 462, 960, 878, 954], [424, 829, 331, 50, 293], [504, 562, 668, 623, 508], [578, 20, 761, 773, 678], [959, 933, 995, 998, 837], [99, 741, 501, 841, 352], [965, 157, 114, 261, 118], [432, 221, 847, 713, 719], [664, 1, 737, 364, 702], [323, 310, 166, 280, 501]], "output": [312, 845, 869, 494, 667, 767, 334, 13, 729, 824, 721, 498, 542, 85, 954, 293, 508, 678, 837, 352, 118, 719, 702, 501, 280, 166, 310, 323, 664, 432, 965, 99, 959, 578, 504, 424, 246, 308, 968, 369, 275, 760, 14, 218, 121, 716, 660, 255, 130, 792, 434, 965, 123, 485, 334, 264, 823, 878, 50, 623, 773, 998, 841, 261, 713, 364, 737, 1, 221, 157, 741, 933, 20, 562, 829, 462, 574, 351, 892, 935, 359, 572, 639, 506, 480, 57, 501, 572, 466, 860, 177, 624, 960, 331, 668, 761, 995, 501, 114, 847], enabled: true },
  {
    name: "1000x1000",
    input: () => matrixGen(1000, 1000),
    enabled: true,
    noCheck: true,
  },
  {
    name: "10000x1000",
    input: () => matrixGen(10000, 1000),
    enabled: false,
    noCheck: true,
  },
  {
    name: "10000x10000",
    input: () => matrixGen(10000, 10000),
    enabled: true,
    noCheck: true,
  },
  {
    name: "100000x10000",
    input: () => matrixGen(100000, 10000),
    enabled: false,
    noCheck: true,
  }
];

describe("Snail Sort", () => {
  cases
    .filter((c) => c.enabled)
    .forEach((c) =>
      it(c.name, () => {

        const matrix = c.input();
        const timedSnail = timedFunc(snail);
        const curr = timedSnail(matrix);

        if (!c.noCheck) {
          expect(curr).toEqual(c.output);
        } else {
          expect(1).toBe(1);
        }
      })
    );
});
