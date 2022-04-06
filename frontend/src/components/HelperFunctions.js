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

