import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //create new account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      throw error;
    }
  }

  //login user
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try{
      return  await this.account.get()
    }catch (error){
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
  }

  // Logout current user
  async logout(){
    try{
        await this.account.deleteSession("current")
    }catch (error){
        console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
