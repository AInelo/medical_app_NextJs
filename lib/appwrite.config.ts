import * as sdk from 'node-appwrite';
import dotenv from 'dotenv';
dotenv.config();
export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID : BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT : ENDPOINT
} = process.env;



const client = new sdk.Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!)

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);





// import * as sdk from 'node-appwrite';

// const {
//     PROJECT_ID,
//     API_KEY,
//     DATABASE_ID,
//     PATIENT_COLLECTION_ID,
//     DOCTOR_COLLECTION_ID,
//     APPOINTMENT_COLLECTION_ID,
//     NEXT_PUBLIC_BUCKET_ID : BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT : ENDPOINT
// } = process.env;

// console.log('Appwrite Configuration:');
// console.log(`PROJECT_ID: ${PROJECT_ID}`);
// console.log(`API_KEY: ${API_KEY}`);
// console.log(`DATABASE_ID: ${DATABASE_ID}`);
// console.log(`PATIENT_COLLECTION_ID: ${PATIENT_COLLECTION_ID}`);
// console.log(`DOCTOR_COLLECTION_ID: ${DOCTOR_COLLECTION_ID}`);
// console.log(`APPOINTMENT_COLLECTION_ID: ${APPOINTMENT_COLLECTION_ID}`);
// console.log(`BUCKET_ID: ${BUCKET_ID}`);
// console.log(`ENDPOINT: ${ENDPOINT}`);

// const client = new sdk.Client()
//     .setEndpoint(ENDPOINT!)
//     .setProject(PROJECT_ID!)
//     .setKey(API_KEY!);

// export const databases = new sdk.Databases(client);
// export const storage = new sdk.Storage(client);
// export const messaging = new sdk.Messaging(client);
// export const users = new sdk.Users(client);
















































// import * as sdk from 'node-appwrite';

// const {
//     PROJECT_ID,
//     API_KEY,
//     DATABASE_ID,
//     PATIENT_COLLECTION_ID,
//     DOCTOR_COLLECTION_ID,
//     APPOINTMENT_COLLECTION_ID,
//     BUCKET_ID,
//     ENDPOINT,
//   } = process.env;
//   console.log('PROJECT_ID:', process.env.PROJECT_ID);

//   console.log('Environment Variables:');
//   console.log(`PROJECT_ID: ${PROJECT_ID}`);
//   console.log(`API_KEY: ${API_KEY}`);
//   console.log(`DATABASE_ID: ${DATABASE_ID}`);
//   console.log(`PATIENT_COLLECTION_ID: ${PATIENT_COLLECTION_ID}`);
//   console.log(`DOCTOR_COLLECTION_ID: ${DOCTOR_COLLECTION_ID}`);
//   console.log(`APPOINTMENT_COLLECTION_ID: ${APPOINTMENT_COLLECTION_ID}`);
//   console.log(`BUCKET_ID: ${BUCKET_ID}`);
//   console.log(`ENDPOINT: ${ENDPOINT}`);
  

//   const client = new sdk.Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('6689c1c1000fa5fd70e5')
//     .setKey('99734b11ec48c4d9ee54beae7410462103a14a86e320e310565a0a6d0e78ee7751d0c0c163a39ebd09cefa80f3a2cbb87bd0a75fb4fa58cf8fe798a09e46005e2ec5512d287354fa23ec9913193e9e4717a80b24837a5045b593498bff8b8e1005b97272db2e13ec39b8bb8f8d4fe0efc8cf0d0b2c6cbcb10610c00487f24806');
  
// export const databases = new sdk.Databases(client);
// export const storage = new sdk.Storage(client);
// export const messaging = new sdk.Messaging(client);
// export const users = new sdk.Users(client);
