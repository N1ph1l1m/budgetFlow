import { IUsers } from "../store/Slice/usersSlice/usersSlice";

interface ICheckActivate {
  users: IUsers[];
  login: string;
}

interface ICheckUser<K extends keyof IUsers> {
  users: IUsers[];
  param: K;
  userParam: IUsers[K];
}


export function checkUserActive({ users, login}: ICheckActivate): boolean {
  const user = users.filter((item) => item.username == login );
  return user[0]?.is_active ? true : false;
}


export function checkUser<K extends keyof IUsers>({
  users,
  param,
  userParam,
}: ICheckUser<K>): boolean {
  return users.some((item) => item[param] === userParam);
}
