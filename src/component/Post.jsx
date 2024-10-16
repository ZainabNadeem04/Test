// import { React, useState } from 'react';


// import { db } from '../config/firebase';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// function Past() {
//   const [submit, setSubmit] = useState(false);
//   const [image, setImage] = useState(''); 
//   const [description, setDescription] = useState(''); 
//   const [uploading, setUploading] = useState(false); 
  
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result); 
//       };
//       reader.readAsDataURL(file); 
//     }
//   };
//   const handleSubmit = async () => {
//     setUploading(true); 
//     setSubmit(true); 
//     try {
//         const myData=collection(db, 'myData')
//       await addDoc(myData, {
//         image: image,
//         description: description,
//       });
//     } catch (error) {
//       console.log('error'); 
//     }
//     setUploading(false);
//   };
//   return (
//     <>
//       {!submit && (
//         <>
//           <h1>Select a photo</h1>
//           <input type="file" onChange={handleImageChange} /> 
//           <h1>Add Description</h1>
//           <input
//             type="text"
//             placeholder="Add description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)} 
//           />
//           <button onClick={handleSubmit} disabled={uploading}>
//             {uploading ? 'Uploading...' : 'Submit'}
//           </button> 
//         </>
//       )}
//       {submit && (
//         <div className="post">
//           {image && <img src={image} alt="myImage" />} 
//           <h3>Caption:</h3>
//           <p>{description}</p> 
//         </div>
//       )}
//     </>
//   );
// }
// export default Past;

import React, { useState } from 'react';
// import './App.css';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Post() {
  const [submit, setSubmit] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image || !description) {
      setError('Please select an image and add a description.');
      return;
    }

    setUploading(true);
    setSubmit(true);
    setError('');

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      
      // Upload image to Firebase Storage
      await uploadBytes(storageRef, image);
      
      // Get the download URL
      const imageUrl = await getDownloadURL(storageRef);

      const myData = collection(db, 'myData');
      await addDoc(myData, {
        image: imageUrl,
        description: description,
      });

      // Reset state after successful upload
      setImage(null);
      setDescription('');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {!submit && (
        <>
          <h1>Select a photo</h1>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <h1>Add Description</h1>
          <input
            type="text"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSubmit} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
          {error && <p className="error">{error}</p>}
        </>
      )}
      {submit && (
        <div className="post">
          {image && <img src={URL.createObjectURL(image)} alt="myImage" style={{ width: '300px', height: 'auto' }} />}
          <h3>Caption:</h3>
          <p>{description}</p>
        </div>
      )}
    </>
  );
}

export default Post;
// import React from 'react';
// import { useLocation } from 'react-router-dom';

// function Post() {
//   const location = useLocation();
//   const { imageUrl, description } = location.state || {};

//   return (
//     <div className="post">
//       {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />}
//       <h3>Caption:</h3>
//       <p>{description}</p>
//     </div>
//   );
// }

// export default Post;
