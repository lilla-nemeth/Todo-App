
export function handleError(err, setter) {
    setter(
        err
        &&err.response
        &&err.response.data
        &&err.response.data.msg
    );
    setTimeout(() => {
        setter('');
    },5000);
}

