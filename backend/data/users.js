import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('987654321', 10),
        isAdmin: true
    },
    {
        name: 'Tejas',
        email: 'user1@example.com',
        password: bcrypt.hashSync('987654321', 10),
    },
    {
        name: 'Nikhil',
        email: 'user2@example.com',
        password: bcrypt.hashSync('987654321', 10),
    }
]

export default users;