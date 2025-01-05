import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase-config'
import { signOut, getAuth } from '@firebase/auth'
import { useNavigate } from 'react-router-dom'

export const getUserRole = async () => {
    const user = auth.currentUser
    if (user) {
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid))
            if (userDoc.exists()) {
                const { role } = userDoc.data()
                return role
            }
        } catch (error) {
            console.log(error)
        }
    }
    return null
}

export const handleLogout = async () => {
    const user = getAuth()
    try {
        await signOut(user);
    } catch (error) {
        console.log(error)
    }
}