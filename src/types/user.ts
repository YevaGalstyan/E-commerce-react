export type UserState = {
    users: User[]
    user: User | null,
    authenticationError: string
}

export type User = {
    id: number;
    password: string
    firstName: string;
    lastName: string;
    imageUrl?: string;
    email: string;
    phone: string;
    isAdmin: boolean;
}

export type initialPage = 'register' | 'login'