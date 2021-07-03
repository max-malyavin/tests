import UserCtrl from "../../controllers/userCntrl";

const userRouter = [
  {
    type: "post",
    url: "/auth/register",
    handler: UserCtrl.create,
    response: { timing: 1000 },
  },
  {
    type: "post",
    url: "/auth/login",
    handler: UserCtrl.login,
    response: { timing: 1000 },
  },
  {
    type: "get",
    url: "/auth/logout",
    handler: UserCtrl.logout,
    response: { timing: 1000 },
  },
];
export default userRouter;
