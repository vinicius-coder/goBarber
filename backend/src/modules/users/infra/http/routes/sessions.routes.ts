import { Router } from 'express';

import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

        const { email, password } = request.body;

        const authenticate = new AuthenticatedUserService;

        const { user, token } = await authenticate.execute({
            email,
            password
        });

        const userDTO = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json({ userDTO, token });

})

export default sessionsRouter;