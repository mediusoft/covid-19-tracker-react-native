const format = amount => {
    return Number(amount)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const getValue = ({ data, type }) => {
    if (!data) {
        return ""
    }
    if (!type) {
        return ""
    }
    if (!data[type]) {
        return ""
    }

    return format(data[type].value)
};