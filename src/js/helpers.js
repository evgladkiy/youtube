export function addListeners(elem, events, func) {
    events.split(' ').forEach(event => elem.addEventListener(event, func, false));
}

export function debounce(func, ms) {
    const state = true;
    let isCooldown = false;

    return () => {
        if (isCooldown) {
            return;
        }
        func();
        isCooldown = state;
        setTimeout(() => {
            isCooldown = null;
        }, ms);
    };
}
