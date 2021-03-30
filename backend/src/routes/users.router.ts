import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import User from '../models/Users';
import CreateUserService from '../service/CreateUserService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig)

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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response,) => {

    try {
        const updateUserAvatar = new UpdateUserAvatarService;

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWithoutPassword);

    } catch (err) {
        return response.status(400).json({ error: err.message });
    }

})

export default usersRouter;