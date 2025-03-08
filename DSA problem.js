function twoSumInPlace(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        let complement = target - arr[i];

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] === complement) {
                return [i, j];
            }
        }
    }
    return [];
}

console.log(twoSumInPlace([2, 7, 11, 15], 9));