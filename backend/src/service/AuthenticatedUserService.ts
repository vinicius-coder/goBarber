import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/Users";

interface Request {
    email: string;
    password: string;
}

interface Response { 
    user: User;
    token: string;
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

        //Payload token
        const token = sign({}, '95a08292af94685fec2824241d8d9b58', {
            subject: user.id,
            expiresIn: '1d'
        })

        return { user, token };

    }
}

export default AuthenticatedUserService;