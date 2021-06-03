
const removeElementStorage = (name) => {
    const storage = JSON.parse(localStorage.getItem(name)).splice(1)
    localStorage.setItem(name, JSON.stringify([...storage]))
}

const addElementStorage = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

export { removeElementStorage, addElementStorage }