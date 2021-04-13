export default (val, min, max) => {
    return parseInt(val > max ? max : val < min ? min : val);
};