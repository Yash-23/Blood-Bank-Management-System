export class SignUpError {
    constructor(bool = false) {
        if (typeof bool !== 'boolean')
            throw new Error(
                'Initialized SignUpError object with invalid argument' +
                    ' type, Expected a boolean',
            );
        this.fNameError = bool;
        this.lNameError = bool;
        this.emailError = bool;
        this.passwordError = bool;
        this.signUpError = {
            isError: bool,
            message: '',
        };
    }
}

export class LogInError {
    constructor(bool = false) {
        if (typeof bool !== 'boolean')
            throw new Error('Initialized LogInError object with invalid argument type');
        this.emailError = bool;
        this.passwordError = bool;
        this.logInError = {
            isError: bool,
            message: '',
        };
    }
}
