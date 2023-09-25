import UserService from '../services/user-service.js';

const userService = new UserService();

export const signup = async (req, res) => {
    try {
        const user = userService.signup(req.body);
        return res.status(201).json({
            success: true,
            message: 'Successfully signed up',
            data: user,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            err: error
        });
    }
}