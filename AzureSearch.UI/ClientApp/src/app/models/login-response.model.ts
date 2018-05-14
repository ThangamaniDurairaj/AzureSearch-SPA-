export interface LoginResponse {
    access_token: string;
    id_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface IdToken {
    sub: string;
    name: string;
    fullname: string;
    jobtitle: string;
    email: string;
    phone: string;
    configuration: string;
}
