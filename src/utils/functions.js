// checks the passed object if a specific property exists, and if true returns the associated object
export const findProperty = (obj, propertyName) => {
    // console.log(obj)
    // console.log(propertyName)
    if (obj.hasOwnProperty(propertyName)) {
        return obj[propertyName]
    } else {
        for (const key of Object.keys(obj)) {
            if (typeof obj[key] === 'object' && obj[key] !== propertyName) {
                const resutl = findProperty(obj[key], propertyName)
                if (resutl) {
                    return resutl
                }
            }
        }
    }
    return null
}