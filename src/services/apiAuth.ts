import axios from "axios";
import getURL from "../utils/globalConstants";
import { TFullUserSchema, TLoginType } from "../schema/authSchema";
import Cookies from "js-cookie";

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

    console.log("USER REQUEST MADE");
    return res.data.user;
  } catch (error) {
    console.log(error);
    throw new Error("Login Unsuccessfull");
  }
}

interface getUserResType {
  status: string;
  user: TFullUserSchema;
}
export async function getCurrentUser() {
  try {
    // const token = Cookies.get("jwt");
    // if (!token) {
    //   console.log("JWT Cookie not found");
    //   return null;
    // }
    const res = await axios.get<getUserResType>(`${URL}/users/me`, {
      withCredentials: true,
    });
    return res.data.user;
  } catch (error) {
    throw new Error("No current user found");
  }
}
