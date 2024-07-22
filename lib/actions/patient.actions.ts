
import { ID, Query } from 'node-appwrite';
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from '../appwrite.config';
import { parseStringify } from '../utils';
import {InputFile} from "node-appwrite/file"
import dotenv from 'dotenv';
dotenv.config();

interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log('Creating user with:', user);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
    return newUser; // Return the created user
  } catch (error: any) {
    console.error('Error creating user:', error); // Log the error
    if (error.code === 409) {
      const documents = await users.list([
        Query.equal('email', [user.email])
      ]);
      return documents.users[0]; // Return the existing user
    } else {
      throw error; // Rethrow unexpected errors
    }
  }
};


export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error)
  }
} 

export const registerPatient = async ({identificationDocument, ...patient} : RegisterUserParams) => {
  try {
    let file;
    if(identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      )
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error)
  }
}