let timeOut;

export function handleError(err, setter) {
    setter(        
        err
        &&err.response
        &&err.response.data
        &&err.response.data.msg
    );

    timeOut = setTimeout(() => {
        setter('');
    }, 5000);
}

export function clearError() {
    clearTimeout(timeOut);
}

export function selectToEdit(
    el, 
    editedId, 
    idSetter, 
    inputSetter
) {
    if (el && editedId === el.id) {
        idSetter(null);
        inputSetter('');
    } else {
        idSetter(el.id);
        inputSetter(el.title);
    }
}