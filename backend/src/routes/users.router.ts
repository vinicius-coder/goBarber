import { response, Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/Users';
import CreateUserService from '../service/CreateUserService';

const usersRouter = Router();

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

usersRouter.get('/', async (request, response) => {
    
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(users);

})

export default usersRouter;