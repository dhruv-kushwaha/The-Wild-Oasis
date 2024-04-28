import axios from "axios";
import getURL from "../utils/globalConstants";
import {
  TFullUserSchema,
  TLoginType,
  TSignupType,
  TUpdatePasswordType,
  TUpdateUserType,
} from "../schema/authSchema";

const URL = getURL();

interface SignupResType {
  user: TFullUserSchema;
  status: string;
}
export async function signup({
  name,
  email,
  password,
  confirmPassword,
}: TSignupType) {
  try {
    const res = await axios.post<SignupResType>(`${URL}/users/signup`, {
      name,
      email,
      password,
      confirmPassword,
      avatar: "",
    });

    return res.data.user;
  } catch (error) {
    console.log(error);
    throw new Error("User could not be created");
  }
}

interface loginResType {
  status: string;
  token: string;
  user: TFullUserSchema;
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

export async function logout() {
  try {
    await axios.get(`${URL}/users/logout`);
  } catch (error) {
    console.log(error);
    throw new Error("Error Logging out");
  }
}

export async function updateUser(updatedUser: TUpdateUserType) {
  try {
    const formData = new FormData();

    // for (const [key, value] of Object.entries(updatedUser)) {
    //   if (value === undefined) {
    //     continue;
    //   }
    //   formData.append(key, value);
    // }
    if (updatedUser.name) {
      formData.append("name", updatedUser.name);
    }

    if (updatedUser.avatar instanceof File) {
      formData.append("avatar", updatedUser.avatar);
    }

    const res = await axios.patch(`${URL}/users/me`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
    throw new Error("User data could not be updated");
  }
}

export async function updatePassword(data: TUpdatePasswordType) {
  try {
    await axios.patch(`${URL}/users/updatePassword`, data);
  } catch (error) {
    console.log(error);
    throw new Error("Password could not be updated");
  }
}
