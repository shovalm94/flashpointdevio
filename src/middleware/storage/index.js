import firebase from "firebase";


function onUpload(options, path) {
  const ref = firebase.storage().ref(path);
  const name = (new Date()) + '-' + options.name;
  const metadata = {
    contentType: options.type
  };
  debugger
  return ref.child(name).put(options, metadata)
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
  imgDelete
}

