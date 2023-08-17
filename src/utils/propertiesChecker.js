export function checker(data, properties = []) {
    properties.forEach(item => {
        if (data[item] === undefined || data[item] === null) {
            throw new Error(`${item} is not a valid`)
        }
    })
}