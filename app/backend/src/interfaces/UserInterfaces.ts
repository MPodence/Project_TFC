export interface ILogin {
  email: string;
  password: string;
}

export interface IUserService {
  userLogin(login: ILogin): Promise<{
    message?: string,
    token?: string,
  }>
}
