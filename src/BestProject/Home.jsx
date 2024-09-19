import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const naviget = useNavigate()
  const [NewArray, SetNewArray] = useState([]);

  const apiCalling = async () => {
    try {
      const response = await axios.get("http://localhost:8000/curdData");
      SetNewArray(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    apiCalling();
  }, []);
const handleEdit = (id)=>{
  naviget(`/EditPage/${id}`)
}
const handleDelete = async (id) => {
  try {
    // Make the delete request to the server
     axios.delete(`http://localhost:8000/curdData/${id}`);
    
    // Update the state by filtering out the deleted item
    SetNewArray((prevArray) => prevArray.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Error deleting data: ", error);
  }
};

  return (
    <>
      <div className="container mt-4">
        <h1>Home</h1>
        <Link to="/CreatPage" className="btn btn-primary my-2">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {NewArray.map((data) => (
              <tr key={data.id}> {/* Replace with a unique identifier if available */}
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>
                  <button className="btn btn-warning" onClick={()=>handleEdit(data.id)}>Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={()=>handleDelete(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
