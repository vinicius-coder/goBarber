import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticatedUserService from "@modules/users/services/AuthenticatedUserService";

export default class SessionsController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticate = container.resolve(AuthenticatedUserService);

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
    }

}