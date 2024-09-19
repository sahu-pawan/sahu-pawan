import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatPage() {
  const naviget = useNavigate()
  const [formdata, setFormdata] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formdata.name || !formdata.phone || !formdata.email) {
      toast.error("All fields are required");
      return;
    }

    axios
      .post("http://localhost:8000/curdData", formdata)
      .then((res) => {
        toast.success("Submitted Successfully");
        setFormdata({ name: "", phone: "", email: "" }); 
      })
      .catch((err) => {
        toast.error("Submission Failed");
        console.error("Error submitting form: ", err);
      });
  };
const handleGohome = ()=>{
  naviget("/")
}
  return (
    <>
      <div className="container mt-4">
        <h1>Create Page </h1>
        <form onSubmit={handleSubmit}>
          <div className="md-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              className="form-control"

            />
          </div>
          <div className="md-3">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formdata.phone}
              onChange={handleChange}
              className="form-control"

            />{" "}
          </div>
          <div className="mb-30">
            <label className="form-label">Email:
            </label>
            <input
              type="text"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="form-control"
            />
          </div> <br />

          <button type="submit" className="btn btn-primary btn-lg btn-block form-control">Add</button> <br /><br />
          <button className="btn btn-primary " onClick={handleGohome}>Go to Home </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default CreatPage;
