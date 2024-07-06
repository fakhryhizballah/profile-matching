const ranges = [
    { min: 0, max: 64, value: 1 },
    { min: 65, max: 74, value: 2 },
    { min: 75, max: 84, value: 3 },
    { min: 85, max: 94, value: 4 },
    { min: 95, max: 100, value: 5 },
];

function convertNilai(input) {
    for (let range of ranges) {
        if (input >= range.min && input <= range.max) {
            return range.value;
        }
    }
    return null; // Return null if input is out of range
}
const differences = [
    { diff: 0, weight: 5 },
    { diff: 1, weight: 4.5 },
    { diff: -1, weight: 4 },
    { diff: 2, weight: 3.5 },
    { diff: -2, weight: 3 },
    { diff: 3, weight: 2.5 },
    { diff: -3, weight: 2 },
    { diff: 4, weight: 1.5 },
    { diff: -4, weight: 1 },
    { diff: 5, weight: 0.5 },
    { diff: -5, weight: 0 },
];

function convertBobot(diff) {
    const entry = differences.find(d => d.diff === diff);
    return entry ? entry.weight : null; // Return null if diff is not found
}


module.exports = {
    convertNilai,
    convertBobot
};