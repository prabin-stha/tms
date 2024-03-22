import { LoginForm } from "@/routes/login";
import { User } from "@/lib/schema/user";
import { RegisterForm } from "@/routes/register";

async function login(data: LoginForm): Promise<User> {
  console.log("data: ", data);
  return { name: "Prabin Shrestha", email: "shresthaprabin315@gmail.com" };
}

async function register(data: RegisterForm): Promise<User> {
  console.log("data: ", data);
  return { name: "Prabin Shrestha", email: "shresthaprabin315@gmail.com" };
}

function logout() {}

export const authService = {
  login,
  register,
  logout,
};
