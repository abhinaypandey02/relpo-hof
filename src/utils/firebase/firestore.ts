import 'firebase/firestore';
import UserInterface, { defaultUser } from '../../interface/user_interface';
import fire from './firebase';

export async function createUserDocument(userProps:any) {
    return await fire.firestore().collection('users').add({...defaultUser,...userProps});
}

export async function getUserDocument(email:UserInterface['email']) {
    const data=await fire.firestore().collection('users').where('email','==',email).get();
    if(data&&!data.empty&&data.docs.length===1&&data.docs[0].exists){
        return data.docs[0];
    } else return null;
}