import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("663061ae002c75ad76a0"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
