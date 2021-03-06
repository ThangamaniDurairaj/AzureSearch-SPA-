import { Injectable } from '@angular/core';

@Injectable()
export class JwtHelper {

    public urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode(output);
    }

    private b64DecodeUnicode(str: any) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), (c: any) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    public decodeToken(token: string): any {
        let parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        let decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }

    public getTokenExpirationDate(token: string): Date {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        let date = new Date(0); 
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    public isTokenExpired(token: string, offsetSeconds?: number): boolean {
        let date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (date == null) {
            return false;
        }

        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }
}
