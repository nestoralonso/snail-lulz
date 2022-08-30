//@ts-check
/**
 * Snail Sort
 *
 * This function will sort a NxN matrix using the following pattern:
 *  - Number of elements to read on each iteration: N M-1 N-1 M-2 N-2 ... M-(M-1) N-(N-1)
 *  - Given a [i,j] pair, the snail will travel clockwise by doing this:
 *    -- Iteration N:   j++
 *    -- Iteration M-1: i++
 *    -- Iteration N-1: j--
 *    -- Iteration M-2: i--
 *    -- Iteration N-2: (start over with j++)
 *    -- (continue)
 *
 * @param {array} a NxM matrix.
 * @return {array} the array of elements arranged from outermost elements to the middle element, traveling clockwise.
 */
 function snail(array) {
    //*************** VARIABLES ***************
    const yDimLenght = array.length;
    const xDimLenght = array?.[0]?.length ?? 0;

    const result = [];
    let x = 0, y = 0;
    let horizontalIterations = xDimLenght
    let verticalIterations = yDimLenght - 1

    let turnControl = 1;
    let isIteratingOverX = true;
    let hasToIncrease = true;

    //****** LOOP having O(n) complexity ********
    for (let resultIndex = 0; resultIndex < xDimLenght * yDimLenght; resultIndex++){
        result[resultIndex] = array[x][y];

        //Turn the snail to the right if it's at the edge
        if ((turnControl == horizontalIterations && isIteratingOverX) || (turnControl == verticalIterations && !isIteratingOverX)){

            if (isIteratingOverX){
                horizontalIterations--;
            } else {
                verticalIterations--;
                hasToIncrease = !hasToIncrease;
            }
            turnControl = 0;
            isIteratingOverX = !isIteratingOverX;
        }

        //Increase or decrease the dimension before reading the next value
        if (isIteratingOverX){
            y = (hasToIncrease ? y+1 : y-1);
        } else {
            x = (hasToIncrease ? x+1 : x-1);
        }

        turnControl++;
    }

    //******* RETURN *******
    return result;
}

module.exports = snail;