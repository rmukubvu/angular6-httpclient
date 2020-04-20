import { User } from './User';

export class LoginResponse {
    response: string;
    error: boolean;
    user: User;
}
