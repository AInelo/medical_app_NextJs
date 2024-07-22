/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormFIeld from "@/components/ui/CustomFormField"
import SubmitButton from "../ui/SubmitButton"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useState } from "react"
import {PatientFormValidation} from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import {Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues} from '../../constants/index'
import { Label } from "@radix-ui/react-label"
import { SelectItem } from "../ui/select"
import Image from 'next/image'
import FileUploader from "../ui/FileUploader"

const RegisterForm = ({user}: {user: User}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: ""
    },
  })

  async function onSubmit(values : z.infer<typeof PatientFormValidation>) {
    setIsLoading(true)
      let formData;
        
      if(values.identificationDocument && values.identificationDocument.length > 0){
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })

        formData = new FormData();
        formData.append('blobFile', blobFile);
        formData.append('filename', values.identificationDocument[0].name)
      }
    try {
        const patientData = {
            ...values,
            userId: user.$id,
            birthDate: new Date(values.birthDate),
            identificationDocument : formData,
        }

        // @ts-ignore
        const patient = await registerPatient(patientData);
  
        if(patient) router.push(`/patients/${user.$id}`)
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personnal information</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFIeld
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthdate"
                label="Date of Birth "
            />
            <CustomFormFIeld
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field) => (
                <FormControl>
                    <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between cursor-pointer"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                    {GenderOptions.map((option) => (
                        <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label className="cursor-pointer" htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                    </RadioGroup>
                </FormControl>
                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormFIeld
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="Cotonou, Haie Vive"
          />
        <CustomFormFIeld
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupations"
            label="occupations "
            placeholder="Software Engineer"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFIeld
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="Parents name's"
                
            />
            <CustomFormFIeld
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="EmergencyContactNumber"
                label="Emergency Contact Number"
                placeholder="+229 12 34 56 78"
            />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormFIeld
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
          > 
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name} >
                <div className="flex cursor-pointer items-center gap-2">
                    <Image
                        src={doctor.image}
                        width={32}
                        height={32}
                        alt={doctor.name}
                        className="rounded-full border border-dark-500"
                    />
                    <p>
                        {doctor.name}
                    </p>
                </div>
            </SelectItem>
          ))}
          </CustomFormFIeld>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFIeld
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="BlueCross BlueShield"
            />
            <CustomFormFIeld
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="ABC123456789"
            />


        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFIeld
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies"
            placeholder="Peanuts, Pellicinin, Pollen"
            />
            <CustomFormFIeld
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current medications (if Any)"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
            />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFIeld
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother had brain cancer, Fatherhad heart disease"
            />
            <CustomFormFIeld
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Appendectomy, Tonillectomy"
            />
        </div>


        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Idenficiation & Verification</h2>
          </div>
        </section>


        <CustomFormFIeld
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an identification type"
          > 
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
                {type}
            </SelectItem>
          ))}
        </CustomFormFIeld>

        <CustomFormFIeld
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
        />

        <CustomFormFIeld
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Csanned copy of Identification Document"
            renderSkeleton={(field) => (
            <FormControl>
               <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
            )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent & Privacy</h2>
          </div>
        </section>

        <CustomFormFIeld
            fieldType={FormFieldType.CHECKBOX}
            control = {form.control}
            name='treatmentConsent'
            label='I consent to treatment'
        />
        <CustomFormFIeld
            fieldType={FormFieldType.CHECKBOX}
            control = {form.control}
            name='disclosureConsent'
            label='I consent to disclosure of information'
        />
        <CustomFormFIeld
            fieldType={FormFieldType.CHECKBOX}
            control = {form.control}
            name='privacyConsent'
            label='I consent to privacy policy'
        />



        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <SubmitButton isLoading={isLoading}> Get started </SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm