//form for adding new news
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtSlQneJz4h6HPbpYa5MtGXaSuQXBDg4Q",
  authDomain: "videoeditingportfolio-af3d5.firebaseapp.com",
  databaseURL:
    "https://videoeditingportfolio-af3d5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "videoeditingportfolio-af3d5",
  storageBucket: "videoeditingportfolio-af3d5.appspot.com",
  messagingSenderId: "611866389562",
  appId: "1:611866389562:web:694015818198e84675d903",
  measurementId: "G-QCVNM38EV0",
};

const app = initializeApp(firebaseConfig);
// Get a reference to the Firebase storage service
const storage = getStorage(app);

const NewsForm = ({ url }) => {
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    agree: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, agree: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {
      title: "",
      description: "",
      image: "",
      category: "",
      agree: "",
    };

    let isValid = true;

    if (!formData.title) {
      formErrors.title = "Please provide a valid club name.";
      isValid = false;
    }

    if (!formData.description) {
      formErrors.description = "Please provide a valid description.";
      isValid = false;
    }

    if (!formData.image) {
      formErrors.image = "Please provide a valid image.";
      isValid = false;
    }

    if (!formData.agree) {
      formErrors.agree = "You must agree before submitting.";
      isValid = false;
    }

    if (!formData.category) {
      formErrors.category = "Please provide a valid category.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
    }

    function addDateTimeToFilename(filename) {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const dateTimeString = `${month}${day}_${hours}${minutes}${seconds}`;

      const fileParts = filename.split(".");
      const namePart = fileParts.slice(0, -1).join(".");
      const extensionPart = fileParts.slice(-1);

      return `${namePart}_${dateTimeString}.${extensionPart}`;
    }

    const uniqueFilename = addDateTimeToFilename(formData.image.name);

    const storageRef = ref(storage, `newsroom/${uniqueFilename}`);
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            image: downloadURL,
          };

          axios
            .post(`${url}/submit/news`, data)
            .then((res) => {
              console.log(res.data);
              alert("News added successfully");
            })
            .catch((err) => {
              console.error("Error submitting news:", err);
              alert("Error submitting news");
            });
        });
      }
    );
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("/hero-image.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div
          className="container"
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div className="row">
            <div className="col-8 offset-2">
              <h1>Add a News</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter The Club Name"
                    id="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols="2"
                    rows="2"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.description}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Tech" defaults>
                      Tech
                    </option>
                    <option value="Cultural">Cultural</option>
                    <option value="Club Recruitment">Club Recruitment</option>
                    <option value="Sports">Sports</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                  </select>
                  <div className="invalid-feedback">{errors.category}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.image}</div>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Please enter all the fields
                  </label>
                  <div className="invalid-feedback">{errors.agree}</div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsForm;
