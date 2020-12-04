export declare class User {
    id?: number;
    email: string;
    password: string;
    phoneNumber: string;
    rememberMe?: boolean;
    terms?: boolean;
    confirmPassword: string;
    fullName?: string;
    constructor(id?: number, email?: string, password?: string, rememberMe?: boolean, terms?: boolean, confirmPassword?: string, fullName?: string);
}
