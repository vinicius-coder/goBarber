import { Router } from 'express';
import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

interface UserDTO {
    name: string,
    email: string,
    password?: string
}

usersRouter.post('/', async (request, response) => {

    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.status(201).json(userWithoutPassword);

    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default usersRouter;