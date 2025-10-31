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
import { useState } from "react"
import { useToast } from "@/context/useToast"

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const SignUp = () => {
    
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUserInfo, userInfo } = useUser()
    const {setToast}  = useToast()

    console.log(userInfo)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = (data: z.infer<typeof formSchema>) => {
      setLoading(true);

      setTimeout(() => {
        const existingData = userInfo;

        if (existingData.email === data.email) {
          setToast({
            message: "Account already exists",
            status: "error",
          });
          setLoading(false);
          setTimeout(() => setToast({ message: "", status: undefined }), 3000);
          return;
        }

        try {
          setUserInfo({
            email: data.email,
            password: data.password,
            tickets: [],
          });
      
          setToast({
            message: "Account created successfully",
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
      }, 2000);
    };

  return (
    <Card className="w-[400px] mx-auto mt-20 rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-3xl">Create Account</CardTitle>
          <CardDescription>
            Get started with TicketFlow today
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
              {loading ? "Creating Account" : "Create Account"}
            </Button>
        </CardFooter>

        <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/auth/login')}
                className="text-primary font-semibold hover:text-accent transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </p>
        </div>
    </Card>
  )
}

export default SignUp