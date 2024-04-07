import { LoginForm } from "@/routes/login";
import { Secret, User, secretSchema, userSchema } from "@/lib/schema/user";
import { RegisterForm } from "@/routes/register";
import { client } from "./axios";
import { useAuth } from "@/store/auth";
import axios from "axios";

export interface FormError {
  message?: string;
  empty?: boolean;
}

async function getUser(): Promise<User | null> {
  try {
    const response = await client.get("/api/v1/user/");
    const parsedData = userSchema.parse(response.data.data);

    return parsedData;
  } catch (err) {
    return null;
  }
}

export interface SecretWithError {
  data?: Secret;
  error?: FormError;
}
async function login(data: LoginForm): Promise<SecretWithError> {
  try {
    const response = await client.post("/api/v1/get-token/", {
      username: data.email,
      password: data.password,
    });
    const parsedData = secretSchema.parse(response.data.data);

    return { data: parsedData };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return { error: { message: err?.response?.data.message } };
    }
    return { error: { empty: true } };
  }
}

async function refresh(): Promise<Secret | null> {
  try {
    const refresh = useAuth.getState().refresh;
    if (refresh) {
      const response = await client.post("/api/v1/refresh/", { refresh });
      const parsedData = secretSchema.parse(response.data.data);

      return parsedData;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export interface RegisterWithError {
  data?: User;
  error?: FormError;
}
async function register(data: RegisterForm): Promise<RegisterWithError> {
  try {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append(
      "profilePic",
      data.profilePic?.[0] as Blob,
      data.profilePic?.[0]?.name
    );
    formData.append("role_type", data.roleType);
    const response = await client.post("/api/v1/register/", formData);
    const parsedData = userSchema.parse(response.data.data);

    return { data: parsedData };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const isSingleError = !err?.response?.data?.data;
      console.log("register: ", isSingleError, err?.response?.data);
      if (isSingleError)
        return { error: { message: err?.response?.data.message } };
      return { error: err?.response?.data?.data };
    }
    return { error: { empty: true } };
  }
}

async function promoteToProvider() {
  try {
    await client.put(`/api/v1/user/update/`, {
      role_type: "provider",
    });
    return true;
  } catch (err) {
    return false;
  }
}

export const authService = {
  login,
  register,
  refresh,
  getUser,
  promoteToProvider,
};
