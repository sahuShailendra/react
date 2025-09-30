import { Client, ID, Query, Storage, Databases} from "appwrite";
import config from "../config/config";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({ title, content, featureImage, status, userID, slug}){
    try{
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            ID.unique(), 
            {
                title,
                content,
                featureImage,
                status,
                userID,
                slug
            }
        )
    }catch(error){
        console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(documentId, { title, content, featureImage, status, slug}){
    try{
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            documentId, 
            {
                title,
                content,
                featureImage,
                status,
            }
        )
    }catch(error){
        console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(documentId){
    try{
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            documentId
        )
        return true
    }catch(error){
        console.log("Appwrite serive :: deletePost :: error", error);
        return false
    }
  }

  async getPost(documentId){
    try{
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            documentId
        )
    
    }catch(error){
        console.log("Appwrite serive :: getPost :: error", error);
        return false
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]){
    try{
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
    
    }catch(error){
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
  }

   // file upload service
  async uploadFile(file){
    try{
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    
    }catch(error){
        console.log("Appwrite serive :: uploadFile :: error", error);
        return false
    }
  }

  //file delete from storage
  async deleteFile(fileID){
    try{
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileID
        )
    
        return true
    }catch(error){
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false
    }
  }

  //file preview
  getFilePreview(fileID){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileID
    )
  }
}

const service = new Service()

export default service