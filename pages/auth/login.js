import { useFormik } from "formik"
import * as Yup from 'yup';
import { useRouter } from "next/router";
import {  signIn } from 'next-auth/react'


export default function login(){
    const router = useRouter();
    const formikObj = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .email("Invalid email address")
                    .required("This field is required"),
            password: Yup.string()
                        .required("Please type your password") 
        }),
        onSubmit: async(val) =>{
            console.log(`fn Submit\n${"-".repeat(8)}\nReceived obj:`, val)
            
            const cred = await signIn('credentials',{
                email: val?.email,
                password: val?.password,
                redirect: false
            })

            console.log(`[Response]\n${"".repeat(8)}\nCred=>`, cred);

            if(cred.ok) router.push('/shows')
        }
    })

    return (
        <div className={"w-full h-screen bg-gray-600 flex items-center justify-center"}>
            <div className={"w-[400px] min-h-[400px] p-4 bg-white rounded-xl"}>
                <form 
                    onSubmit={formikObj.handleSubmit}
                    className={'flex flex-col space-y-6'}>
                    <label htmlFor="email"
                           className={"w-full my-4 flex flex-col space-y-4"} >
                        <span>Email</span>
                        <input
                            type="email"
                            name={"email"}
                            value={formikObj.values?.email}
                            onChange={formikObj.handleChange}
                            placeholder="Input email" />
                        {
                            formikObj.errors &&
                            formikObj.touched &&
                            formikObj.errors?.email &&
                            formikObj.touched?.email && (
                                <span className={'!text-red-500 !text-sx'}>{formikObj.errors?.email}</span>
                            )
                        }

                    </label>

                    <label htmlFor="password"
                           className={"w-full my-4 flex flex-col space-y-4"} >
                        <span>Password</span>
                        <input
                            type="password"
                            name={"password"}
                            value={formikObj.values?.password}
                            onChange={formikObj.handleChange}
                            placeholder="Input password" />
                        {
                            formikObj.errors &&
                            formikObj.touched &&
                            formikObj.errors?.password &&
                            formikObj.touched?.password  && (
                                <span className={'!text-red-500 !text-sx'}>{formikObj.errors?.password}</span>
                            )
                        }
                    </label>
                        <button
                            type="submit"
                            className={'w-full rounded-xl !bg-blue-500 text-white'}>
                            Submit
                        </button>
                </form>
            </div>

        </div>
    )
}