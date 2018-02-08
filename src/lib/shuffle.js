/*
* Function that shuffles an array using a Fisher-Yates shuffle.
*/
module.exports.shuffle = arr => {
    let i = 0;
    let j = 0;
    let temp = null;
    if (arr) {
        const tempArray = arr.slice(0);
        for (i = arr.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = tempArray[i];
            tempArray[i] = tempArray[j];
            tempArray[j] = temp;
        }
        return tempArray;
    }
    return arr;
};
