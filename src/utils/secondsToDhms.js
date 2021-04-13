const secondsToDhms = seconds => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return [
        {
            label: 'days',
            value: d
        },
        {
            label: 'hours',
            value: h
        },
        {
            label: 'minutes',
            value: m
        },
        {
            label: 'seconds',
            value: s
        }
    ];
};

export default secondsToDhms;