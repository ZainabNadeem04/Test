// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../config/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// function Select() {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setError(''); // Clear error if a valid image is selected
//     }
//   };

//   const handleSubmit = async () => {
//     if (!image || !description) {
//       setError('Please select an image and add a description.');
//       return;
//     }

//     setUploading(true);
//     setError('');

//     try {
//       const storage = getStorage();
//       const storageRef = ref(storage, `images/${image.name}`);
      
//       // Upload image to Firebase Storage
//       await uploadBytes(storageRef, image);
      
//       // Get the download URL
//       const imageUrl = await getDownloadURL(storageRef);

//       const myData = collection(db, 'myData');
//       await addDoc(myData, {
//         image: imageUrl,
//         description: description,
//       });

//       // Navigate to DisplayPage with the image URL and description
//       navigate('/display', { state: { imageUrl, description } });
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setError('Failed to upload. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <h1>Select a photo</h1>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <h1>Add Description</h1>
//       <input
//         type="text"
//         placeholder="Add description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <button onClick={handleSubmit} disabled={uploading}>
//         {uploading ? 'Uploading...' : 'Submit'}
//       </button>
//       {error && <p className="error">{error}</p>}
//     </>
//   );
// }

// export default Select;
