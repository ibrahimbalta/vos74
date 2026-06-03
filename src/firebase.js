import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc 
} from "firebase/firestore";

// Vite Environment variables with fallback to user's provided Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDEiO-9gXTXiCbWdjU9868G1xTSjoz73j0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vos74-3190e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vos74-3190e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vos74-3190e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "148219211182",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:148219211182:web:b46c935e6d51d67de92c3f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5T8W21RBTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Seeding helper to populate Firestore on first run if collections are empty
export async function seedDatabaseIfEmpty(initialData) {
  try {
    // 1. Seed settings
    const settingsDocRef = doc(db, "settings", "general");
    const settingsSnap = await getDoc(settingsDocRef);
    if (!settingsSnap.exists()) {
      console.log("Seeding settings collection...");
      await setDoc(settingsDocRef, {
        socialLinks: initialData.socialLinks,
        beforeAfterData: initialData.beforeAfterData,
        workingHours: initialData.workingHours,
        team: initialData.team,
        branchDetails: initialData.branchDetails
      });
    }

    // Helper to seed standard list collections
    const seedListCollection = async (colName, list) => {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      if (snapshot.empty) {
        console.log(`Seeding ${colName} collection...`);
        for (const item of list) {
          // Convert numeric IDs to string for doc ID if possible, otherwise let addDoc auto-generate
          if (item.id) {
            const docId = String(item.id);
            await setDoc(doc(db, colName, docId), item);
          } else {
            await addDoc(colRef, item);
          }
        }
      }
    };

    // 2. Seed appointments
    await seedListCollection("appointments", initialData.appointments);

    // 3. Seed activeRepairs
    await seedListCollection("activeRepairs", initialData.activeRepairs);

    // 4. Seed completedRepairs
    await seedListCollection("completedRepairs", initialData.completedRepairs);

    // 5. Seed listings
    await seedListCollection("listings", initialData.listings);

    console.log("Firestore database seeding check completed successfully!");
  } catch (error) {
    console.error("Error during Firestore seeding:", error);
  }
}
