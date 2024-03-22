import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/template/theme-toggle";
import { BackgroundImage } from "@/components/ui/background-image";

import bg from "@/assets/bg.jpg";

import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/register")({
  beforeLoad() {
    const { token } = useAuth.getState() ?? {};

    if (token)
      throw redirect({
        to: "/",
      });
  },
  component: Register,
});

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type RegisterForm = z.infer<typeof formSchema>;

const defaultValues: RegisterForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const login = useAuth((state) => state.login);

  const handleSubmit = async (values: RegisterForm) => {
    await login(values);
  };

  return (
    <BackgroundImage bg={bg}>
      <div className="flex flex-col container h-screen">
        <header className="mt-4 flex justify-end">
          <ThemeToggle />
        </header>
        <div className="flex flex-1">
          <Card className="m-auto max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription>
                Enter email and password to create your new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            required
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input required type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input required type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Regiser
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <CardDescription>Already have an account?</CardDescription>
              <Button variant="link" className="pl-1">
                <Link to="/login">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </BackgroundImage>
  );
}
