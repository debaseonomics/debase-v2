export default (pastdate, recentDate) => {
    const difference = Math.abs(recentDate - pastdate);
    return difference / (1000 * 60 * 60 * 24);
};