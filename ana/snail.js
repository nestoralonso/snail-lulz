let rowCalculationAuxiliary = 0;
let colCalculationAuxiliary = 0;

function snail(array) {
    let initialCoordinate = [];
    let finalCoordinate = [];
    let result = [];

    rowCalculationAuxiliary = array.length;
    colCalculationAuxiliary = array.at(0) !== undefined ? array.at(0).length : 0;

    const isSortCompleted = () => { return array.flat().length === result.flat().length }

    let iteration = 1;
    while (!isSortCompleted()) {
        let coordinates = getCoordinates(iteration, finalCoordinate);
        initialCoordinate = coordinates[0];
        finalCoordinate = coordinates[1];
        let sortedArrayElements = getSortedArrayElements(array, initialCoordinate, finalCoordinate)
        result.push(sortedArrayElements);
        iteration++;
    }

    return result.flat();
}

function getCoordinates(iteration, previousFinalCoordinate) {
    let coordinates = []
    let newInitialCoordinate = [];
    let newFinalCoordinate = [];

    const isEven = number => number % 2 === 0;
    const isDivisibleBy4 = number => number % 4 === 0;

    if (iteration === 1) {
        newInitialCoordinate = [0, 0]
        newFinalCoordinate = [0, colCalculationAuxiliary - 1]
    } else {
        if (isEven(iteration)) {
            rowCalculationAuxiliary--;
        } else {
            colCalculationAuxiliary--;
        }

        if (isEven(iteration)) {
            if (isDivisibleBy4(iteration)) {
                newInitialCoordinate = [previousFinalCoordinate[0] - 1, previousFinalCoordinate[1]]
                newFinalCoordinate = [previousFinalCoordinate[0] - rowCalculationAuxiliary, previousFinalCoordinate[1]]
            } else {
                newInitialCoordinate = [previousFinalCoordinate[0] + 1, previousFinalCoordinate[1]]
                newFinalCoordinate = [previousFinalCoordinate[0] + rowCalculationAuxiliary, previousFinalCoordinate[1]]
            }
        } else {
            if (isDivisibleBy4(iteration - 1)) {
                newInitialCoordinate = [previousFinalCoordinate[0], previousFinalCoordinate[1] + 1]
                newFinalCoordinate = [previousFinalCoordinate[0], previousFinalCoordinate[1] + colCalculationAuxiliary]
            } else {
                newInitialCoordinate = [previousFinalCoordinate[0], previousFinalCoordinate[1] - 1]
                newFinalCoordinate = [previousFinalCoordinate[0], previousFinalCoordinate[1] - colCalculationAuxiliary]
            }
        }
    }

    coordinates.push(newInitialCoordinate, newFinalCoordinate);
    return coordinates;
}

function getSortedArrayElements(array, initialCoordinate, finalCoordinate) {
    let result = [];

    const sense = initialCoordinate[0] === finalCoordinate[0] ? 'horizontal' : 'vertical';

    let direction = 'forward';
    if (sense === 'horizontal') {
        direction = initialCoordinate[1] <= finalCoordinate[1] ? 'forward' : 'backwards';
    } else if (sense === 'vertical') {
        direction = initialCoordinate[0] <= finalCoordinate[0] ? 'forward' : 'backwards';
    }

    if (sense === 'horizontal' && direction === 'forward') {
        row = array[initialCoordinate[0]];
        result = row.slice(initialCoordinate[1], finalCoordinate[1] + 1);
    } else if (sense === 'horizontal' && direction === 'backwards') {
        row = array[initialCoordinate[0]];
        result = row.slice(finalCoordinate[1], initialCoordinate[1] + 1);
        result = result.reverse()
    } else if (sense === 'vertical' && direction === 'forward') {
        for (let i = initialCoordinate[0]; i <= finalCoordinate[0]; i++) {
            result.push(array[i][finalCoordinate[1]]);
        }
    } else if (sense === 'vertical' && direction === 'backwards') {
        for (let i = initialCoordinate[0]; i >= finalCoordinate[0]; i--) {
            result.push(array[i][finalCoordinate[1]]);
        }
    }

    return result;
}

module.exports = snail;