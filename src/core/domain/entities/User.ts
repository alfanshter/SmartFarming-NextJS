export interface User {
    id: string;
    name: string;
    email: string;
    role: 'farmer' | 'admin' | 'guest';
    createdAt: Date;
    updatedAt: Date;
}