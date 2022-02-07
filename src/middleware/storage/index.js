import firebase from "firebase";

function onUpload(image,path,Id) {
  debugger
  const ref = firebase.storage().ref(path);
  const name = (new Date()) + '-' + Id;
  const metadata = {
    contentType: image.type
  };
  return ref.child(name).put(image, metadata)
    .then(snapshot => {
      return snapshot.ref.getDownloadURL()
        .then((url) => {
          return url;
        })
    })
    .catch(console.error);
}

function imgDelete(options) {
}

export default {
  onUpload,
  imgDelete,
}

