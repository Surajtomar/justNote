import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const fireUploadProfilePic = ({ uid, picture, uploadStatus }) => {
  // Create a reference to 'mountains.jpg'

  const profilePicRef = ref(storage, "profilePic/" + uid + "/" + picture.name);
  uploadStatus({ status: "started" });
  uploadBytes(profilePicRef, picture)
    .then((snapshot) => {
      getDownloadURL(profilePicRef).then((downloadURL) =>
        uploadStatus({ status: "completed", url: downloadURL })
      );
    })
    .catch((error) => uploadStatus({ status: "error", error: error.message }));
};
