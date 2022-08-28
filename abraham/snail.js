//@ts-check
// Function to modify
function snail(array) {
  const m = array.length;
  const n = array[0] && array[0].length;

  const directions = {
    R: "right",
    D: "down",
    L: "left",
    U: "up"
  };

  const accum = {
    result: []
  };

  accum[directions.R] = {
    fix: 0,
    from: 0,
    to: n - 1
  };

  accum[directions.D] = {
    fix: n - 1,
    from: 1,
    to: m - 1
  };

  accum[directions.L] = {
    fix: m - 1,
    from: n - 2,
    to: 0
  };

  accum[directions.U] = {
    fix: 0,
    from: m - 2,
    to: 1
  };

  function reduce(accum, array, direction) {
    const { fix, from, to } = accum[direction];

    if (m == 0) return accum.result;

    switch (direction) {
      case directions.R:
        for (let i = from; i <= to; i++) {
          accum.result.push(array[fix][i]);
        }

        accum[direction] = {
          fix: fix + 1,
          from: from + 1,
          to: to - 1
        };

        if (accum.result.length >= m * n) return accum.result;

        return reduce(accum, array, directions.D);
      case directions.D:
        for (let i = from; i <= to; i++) {
          accum.result.push(array[i][fix]);
        }

        accum[direction] = {
          fix: fix - 1,
          from: from + 1,
          to: to - 1
        };

        if (accum.result.length >= m * n) return accum.result;

        return reduce(accum, array, directions.L);
      case directions.L:
        for (let i = from; i >= to; i--) {
          accum.result.push(array[fix][i]);
        }

        accum[direction] = {
          fix: fix - 1,
          from: from - 1,
          to: to + 1
        };

        if (accum.result.length >= m * n) return accum.result;

        return reduce(accum, array, directions.U);
      case directions.U:
        for (let i = from; i >= to; i--) {
          accum.result.push(array[i][fix]);
        }

        accum[direction] = {
          fix: fix + 1,
          from: from - 1,
          to: to + 1
        };

        if (accum.result.length >= m * n) return accum.result;

        return reduce(accum, array, directions.R);
    }
  }

  return reduce(accum, array, directions.R);
}


module.exports = snail;
