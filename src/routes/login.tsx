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
import { useToast } from "@/components/ui/use-toast";

export const Route = createFileRoute("/login")({
  beforeLoad() {
    const { token } = useAuth.getState() ?? {};

    if (token)
      throw redirect({
        to: "/",
      });
  },
  component: Login,
});

const formSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(8, "Password should be greater than 7 digits long"),
});
export type LoginForm = z.infer<typeof formSchema>;

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const login = useAuth((state) => state.login);
  const { toast } = useToast();

  const handleSubmit = async (values: LoginForm) => {
    const { error } = await login(values);
    if (!error)
      toast({
        title: "Login Success",
        description: "Account Login Successfull.",
      });
    else if (error.empty)
      toast({
        title: "Login Failure",
        description: "Some Error Occured!",
      });
    else {
      toast({
        title: "Login Failure",
        description: error.message,
      });
    }
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
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your email and password to login to your account
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
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <CardDescription>Already have an account?</CardDescription>
              <Button variant="link" className="pl-1">
                <Link to="/register">Register</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </BackgroundImage>
  );
}
