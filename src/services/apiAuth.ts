import axios from "axios";
import getURL from "../utils/globalConstants";
import { TLoginType } from "../schema/authSchema";

const URL = getURL();

interface loginResType {
  status: string;
  token: string;
  user: TLoginType;
}
export async function login({ email, password }: TLoginType) {
  try {
    const res = await axios.post<loginResType>(
      `${URL}/users/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    console.log(res);
    return res.data.user;
  } catch (error) {
    console.log(error);
    throw new Error("Login Unsuccessfull");
  }
}
