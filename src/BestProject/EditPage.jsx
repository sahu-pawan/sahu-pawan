import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/curdData/${id}`)
      .then((res) => {
        setFormdata(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        toast.error("Failed to fetch data");
      });
  }, [id]);

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
      .put(`http://localhost:8000/curdData/${id}`, formdata)
      .then(() => {
        toast.success("Data updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        toast.error("Failed to update data");
      });
  };

  const handleGohome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container mt-4">
        <h1>Edit Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formdata.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary btn-lg btn-block form-control">
            Update
          </button>
          <br />
          <br />
          <button className="btn btn-primary" onClick={handleGohome}>
            Go to Home
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default EditPage;
