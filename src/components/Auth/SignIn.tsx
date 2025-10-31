import { useUser } from "@/context/useUserContext"

import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/context/useToast"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const SignIn = () => {
    const { setUserInfo, userInfo } = useUser()
    const { setToast } = useToast()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = (data: z.infer<typeof formSchema>)=> {
        setLoading(true)
        const savedAccount = {
            email: userInfo.email,
            password: userInfo.password
        }

        const currentAccount = {
            email: data.email,
            password: data.password
        }

        setTimeout(()=> {
            if (
              currentAccount.email !== savedAccount.email ||
              currentAccount.password !== savedAccount.password
            ) {
                setToast({
                    status: "error",
                    message: "Invalid Credentials"
                })
                setLoading(false)
                setTimeout(() => setToast({ message: "", status: undefined }), 3000);
                return
            }
            try {
            setUserInfo(
                {
                    email: data.email,
                    password: data.password,
                    tickets: userInfo.tickets
                }
            )
            setToast({
              message: "Logged in succesfully",
              status: "success",
            });
        
            setTimeout(() => {
              setToast({ message: "", status: undefined });
              navigate("/dashboard")
            }, 3000);
        } catch (error) {
          console.error(error);
          setToast({
            message: "Something went wrong. Try again.",
            status: "error",
          });
          
          setTimeout(() => setToast({ message: "", status: undefined }), 3000);
        } finally {
          setLoading(false);
        }
        }, 1500)
        
        
    }
  return (
    <Card className="w-[400px] mx-auto mt-20 p-8 rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
            <form id="sign-up" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email">
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="luqmanola60@gmail.com"
                                />
                                {
                                    fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )
                                }
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="password"
                                />
                                {
                                    fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )
                                }
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
        </CardContent>

        <CardFooter>
              <Button disabled={loading} type="submit" form="sign-up" className="cursor-pointer w-full">
                {loading ? "Logging in" : "Login"}
              </Button>
        </CardFooter>

        <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/auth/signup')}
                className="text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </p>
        </div>
    </Card>
  )
}

export default SignIn