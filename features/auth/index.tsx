"use client"
import useDynamicMutation from "@/api/use-post-data"
import FormikInput from "@/components/forms/input"
import FormikMaskedInput from "@/components/forms/masked-input"
import { Button } from "@/components/ui/button"
import { signInSchema, SignInSchemaType } from "@/validation/auth.schema"
import { Form, Formik } from "formik"
import { BookImageIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

function SingIn() {
  const postMutation = useDynamicMutation({})

  const handleLogin = async (values: SignInSchemaType) => {
    try {
      await postMutation.mutateAsync({
        url: `api/login/`,
        method: "POST",
        body: {
          username: values.username,
          password: values.password
        },
        onSuccess: (res) => {
          signIn("credentials", {
            data: JSON.stringify(res),
            callbackUrl: "/dashboard",
          });
          toast.loading("Login Successful, Redirecting...");
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-3 max-w-md w-full mx-auto p-10 border border-amber-50 rounded-lg">
        <div className="flex items-center justify-center gap-1 font-bold text-sm">
          <BookImageIcon />
          Digital Library
        </div>

        <p className="text-center text-sm">Login with username and password.</p>

        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={signInSchema}
          onSubmit={(val) => handleLogin(val)}
        >
          {({ }) => {
            return (
              <Form className="flex flex-col gap-5">
                <FormikInput
                  id="username"
                  name="username"
                  label="Username"
                  pattern="username"
                  placeholder="Enter username"
                />
                <FormikMaskedInput
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  viewToggle
                />
                <div className="grid gap-3 mt-5">
                  <Button
                    size={"lg"}
                    type="submit"
                    disabled={postMutation.isPending}
                    variant={"primary"}
                  >
                    {postMutation.isPending ? "Loading..." : "Login"}
                  </Button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default SingIn