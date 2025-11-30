import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
     
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // 401 is expected if user is not logged in
      const isUnauthorized =
        error.code === 401 ||
        error.code === "401" ||
        error.type === "general_unauthorized_scope";
      if (!isUnauthorized) {

      }
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {

    }
  }

  async createVerification(url) {
    try {
      return await this.account.createVerification(url);
    } catch (error) {
      console.log("Appwrite service :: createVerification :: error", error);
      throw error;
    }
  }

  async updateVerification(userId, secret) {
    try {
      return await this.account.updateVerification(userId, secret);
    } catch (error) {
      console.log("Appwrite service :: updateVerification :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
