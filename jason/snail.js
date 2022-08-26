function snail(array) {
    //*************** VARIABLES ***************
    const result = [];
    let i = 0, j = 0;
    let iterationItemQuantity = array.length
    let turnControl = 1;
    let isIteratingOverJ = true;
    let hasToIncrease = true;

    //****** LOOP having O(n) complexity ********
    for (let resultIndex = 0; resultIndex < array.length ** 2; resultIndex++){
        result[resultIndex] = array[i][j];

        //Turn the snail to the right if it's at the edge
        if (turnControl == iterationItemQuantity){
            if (isIteratingOverJ){
              iterationItemQuantity--;
            } else {
              hasToIncrease = !hasToIncrease;
            }
            turnControl = 0;
            isIteratingOverJ = !isIteratingOverJ;
        }

        //Increase or decrease the dimension before reading the next value
        if (isIteratingOverJ){
            j = (hasToIncrease ? j+1 : j-1);
        } else {
            i = (hasToIncrease ? i+1 : i-1);
        }

        turnControl++;
    }

    //******* RETURN *******
    return result;
}

module.exports = snail;