import config from "@/config-appwrite/config";
import { Account, Client, ID } from "appwrite";
import type { CreateUser, User } from "@/types/appwrite";
import { AuthRequiredError } from "@/lib/AuthRequired";

const appwriteClient = new Client();

appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient);

export class AppwriteService {
  async createUser({ email, password, name }: CreateUser) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  async login({ email, password }: User) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw new AuthRequiredError();
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getUser();
      return Boolean(data);
    } catch (error: any) {}
    return false;
  }

  async getUser() {
    try {
      return await account.get();
    } catch (error: any) {}
    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error: any) {
      throw error;
    }
  }
}

const appwriteService = new AppwriteService()

export default appwriteService