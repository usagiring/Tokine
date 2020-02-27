
let events = []
export {
    emit,
    on
}

function emit(name, data) {
    return events[name].map(func => {
        return func(data)
    })
}

function on(name, func) {
    if (!events[name] || !Array.isArray(events[name])) events[name] = []
    events[name].push(func)
}