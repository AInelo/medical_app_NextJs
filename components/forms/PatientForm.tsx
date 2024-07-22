"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormFIeld from "@/components/ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { useState } from "react"
import {UserFormValidation} from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try {
      const userData = {
        name,
        email,
        phone
      }
      console.log("Sending user data:", userData); // Log user data
      const user = await createUser(userData);
      console.log("Received user:", user); // Log received user data
      if (user && user.$id) {
        router.push(`/patients/${user.$id}/register`)
      } else {
        console.error("User creation failed or $id missing");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormFIeld
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="TOTON Lionel"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormFIeld
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email "
          placeholder="totonlionel@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormFIeld
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="+229 12 34 56 78"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <SubmitButton isLoading={isLoading}> Get started </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
