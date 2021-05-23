import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBG5CJZ2B2XcGE7kSWVz989a2XfsXADtkQ",
    authDomain: "crwn-clothing-db-fb310.firebaseapp.com",
    projectId: "crwn-clothing-db-fb310",
    storageBucket: "crwn-clothing-db-fb310.appspot.com",
    messagingSenderId: "391574623534",
    appId: "1:391574623534:web:5fee451ca5c7be3cfa16bf",
    measurementId: "G-CD43WSC6WM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    console.log(snapshot)
    if(!snapshot.exits){
        const {displayName, email}=userAuth
        const createdAt= new Date();
        try{
            await userRef.set({
                displayName,email,createdAt,...additionalData
            })
        }catch(error){
            // console.log('error creating user',error)
            
        }

    }
    return userRef;
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' })
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
};

export default firebase;