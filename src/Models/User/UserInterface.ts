export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    token: string
    created_at: Date;
    updated_at: Date;
}