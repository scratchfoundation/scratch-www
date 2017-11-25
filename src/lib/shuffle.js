/*
* Function that shuffles an array using a Fisher-Yates shuffle.
*/

export function shuffle (arr) {
    var i, j = 0;
    var temp = null;
    if (arr) {
        var tempArray = arr.slice(0);
    } else {
        return arr;
    }

    for (i = arr.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = tempArray[i];
        tempArray[i] = tempArray[j];
        tempArray[j] = temp;
    }
    return tempArray;
}
