import userRouter from './user/route';


export default (router) => {
    userRouter(router);
    return router;
}

