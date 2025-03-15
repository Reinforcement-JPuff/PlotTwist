const AuthController: object = {
    verifyUser: async (req: any, res: any, next: any) => {
        const { user, pass } = req.body;

        return next();
    },
    setCookie: async (req: any, res: any, next: any) => {


        return next();
    },
    checkCookie: async (req: any, res: any, next: any) => {


        return next();
    }
}

export default AuthController;