export class AuthRequiredError extends Error {
    constructor(message = "Invalid Credentials! Please enter valid inputs"){
        super(message)
        this.name = "AuthRequiredError"
    };
}