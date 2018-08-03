let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = (field, value, message) => {
    if(!value || value.length <= 0) {
        errors.push({ field: field, message: message });
    }
}

ValidationContract.prototype.isEmail = (field, value, message) => {
    let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if(!reg.test(value)) {
        errors.push({ field: field, message: message });
    }
}

ValidationContract.prototype.hasMinLen = (field, value, min, message) => {
    if(!value || value.length < min) {
        errors.push({ field: field, message: message });
    }
}

ValidationContract.prototype.hasMaxLen = (field, value, max, message) => {
    if(!value || value.length > max) {
        errors.push({ field: field, message: message });
    }
}

ValidationContract.prototype.errors = () => {
    console.log(errors);
    return errors;
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;