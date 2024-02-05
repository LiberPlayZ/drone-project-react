

export function checkIdNumber(id) { // regex for checking idNumber
    return /^\d{9}$/.test(id);
}
export function checkPassword(password) { // regex for checking password .
    return /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(password);
}
export function checkAge(age) { // regex for checking age .
    return /^(100|[1-9][0-9]?)$/.test(age);
}
export function checkRole(role) { // regex for checking role .
    return role.toLowerCase() === 'admin' || role.toLowerCase() === 'user' ? true : false;
}


export const handleIdNumber = (e, setIdNumber, setError) => { // function to handle on change id Number for showing error if neccesary.
    const value = e.target.value;

    // Validate if the Id contains only numbers and has a  length of 9
    if (!checkIdNumber(value)) {
        setError('Id/f must be exactly 9 digits long and contain only numbers.');
    } else {
        setError('');
    }
    setIdNumber(value);

}




export const handleName = (e, setName, setError) => { // function to handle on change name for showing error if neccesary.
    const value = e.target.value;

    // Validate if the Id contains only numbers and has a  length of 9
    if (value.trim() === '') {
        setError('Name can not be empty');
    } else {
        setError('');
    }
    setName(value);

}
export const handleAge = (e, setAge, setError) => { // function to handle on change age for showing error if neccesary.
    const value = e.target.value;
    // Regular expression to match an integer between 1 and 100
    // Validate if the Id contains only numbers and has a  length of 9
    if (!checkAge(value)) {
        setError('age must be number between 1 to 100');
    } else {
        setError('');
    }
    setAge(value);

}

export const handleRole = (e, setRole, setError) => { // function to handle on change role for showing error if neccesary.
    const value = e.target.value;
    // Regular expression to match an integer between 1 and 100
    // Validate if the Id contains only numbers and has a  length of 9
    if (!checkRole(value)) {
        setError('role must be user or admin');
    } else {
        setError('');
    }
    setRole(value);

}






export const handlePassword = (e, setPassword, setError) => { // function to handle on change password for showing error if neccesary.
    const value = e.target.value;

    // Validate if the password meets the criteria using a single regex pattern
    if (!checkPassword(value)) {
        setError('Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one letter.');
    } else {
        setError('');
    }

    setPassword(value);
}