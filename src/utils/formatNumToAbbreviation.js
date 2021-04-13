export default (number, digits) => {

    const suffixes = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'k' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'G' },
        { value: 1E12, symbol: 'T' },
        { value: 1E15, symbol: 'P' },
        { value: 1E18, symbol: 'E' }
    ]
    let i;
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (i = suffixes.length - 1; i > 0; i--) {
        if (number >= suffixes[i].value) break;
    }
    return (number / suffixes[i].value).toFixed(digits).replace(regex, "$1") + suffixes[i].symbol;
};