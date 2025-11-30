const conf = {
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteProjectName: String(import.meta.env.VITE_APPWRITE_PROJECT_NAME),
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteVerificationUrl: String(import.meta.env.VITE_APPWRITE_VERIFICATION_URL) 
};
export default conf;
