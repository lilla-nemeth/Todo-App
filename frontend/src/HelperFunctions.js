
export function handleError(err, setter) {
    setter(err.response.data.msg);
    setTimeout(() => {
        setter('');
    },5000);
}

