import { storage } from "../config/firebase";
import { auth } from "../config/firebase";

export const uploadProfilePicture = async (id, file) => {
    const uid = await auth.currentUser.uid;
    const oldName = file.name;
    const newName = `${id}.${oldName.substring(oldName.indexOf(".") + 1, oldName.length)}`
    const storageRef = storage.ref(`images/profiles/${uid}/${newName}`);
    const url = await storageRef.put(file).then((snapshot) => {
        const result = snapshot.ref.getDownloadURL().then(downloadUrl => {
            return downloadUrl
        })
        return result
    });
    return url
}

export const deleteProfilePicture = async (id) => {
    const storageRef = storage.ref(`images/profiles/${id}.jpeg`);
    await storageRef.delete().then(() => {
        console.log("deleted")
    }).catch((error) => {
        console.log(error)
    });
}



