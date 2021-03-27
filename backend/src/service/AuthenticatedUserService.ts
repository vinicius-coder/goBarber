import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/Users";

interface Request {
    email: string;
    password: string;
}

interface Response { 
    user: User;
}

class AuthenticatedUserService {
    public async execute({ email, password }: Request): Promise<Response> {

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        })

        if (!user) {
            throw new Error("Incorrect email/password combination");
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error("Incorrect email/password combination");
        }

        return { user };

    }
}

export default AuthenticatedUserService;