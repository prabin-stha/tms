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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import bg from "@/assets/bg.jpg";

import { useAuth } from "@/store/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";

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
    profilePic: z
      .instanceof(FileList)
      .nullable()
      .refine((file) => file?.length == 1, "File is required."),
    roleType: z.string(),
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
  profilePic: null,
  password: "",
  roleType: "user",
  confirmPassword: "",
};
function Register() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const register = useAuth((state) => state.register);
  const { toast } = useToast();

  const fileRef = form.register("profilePic");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (values: RegisterForm) => {
    const { error } = await register(values);
    if (!error)
      toast({
        title: "Register Success",
        description: "Account Sucessfully Created.",
      });
    else if (error.empty)
      toast({
        title: "Register Failure",
        description: "Some Error Occured!",
      });
    else if (error.message) {
      toast({
        title: "Register Failure",
        description: error.message,
      });
    } else {
      Object.entries(error).forEach(([key, value]) => {
        form.setError(key, { message: value });
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
          <Card className="m-auto max-w-4xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription>
                Fill in the details below to create your new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <div className="">
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
                  </div>
                  <FormField
                    control={form.control}
                    name="profilePic"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="hidden"
                            placeholder="profile"
                            {...fileRef}
                            ref={inputFileRef}
                            onChange={(event) => {
                              field.onChange(event.target?.files ?? undefined);
                              setFileName(
                                event.target?.files?.[0].name ?? null
                              );
                            }}
                          />
                        </FormControl>
                        <Input
                          type="button"
                          onClick={() => inputFileRef.current?.click()}
                          value={fileName ?? "Please select a picture"}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="user">Normal User</SelectItem>
                            <SelectItem value="provider">Provider</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-2">
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
                  </div>
                  <Button className="w-full" type="submit">
                    Register
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
