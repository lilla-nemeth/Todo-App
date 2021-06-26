export function handleError(err, setter) {
    setter(
        // short circuit evaluation:
        err
        &&err.response
        &&err.response.data
        &&err.response.data.msg
    );
    setTimeout(() => {
        setter('');
    },5000);
}

