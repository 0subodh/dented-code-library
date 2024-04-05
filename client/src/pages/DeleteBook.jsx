import React, { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  console.log("id", id);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(e);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1>Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div>
        <h3>Are you sure you want to delete the book?</h3>
        <button
          onClick={handleDeleteBook}
          className="p-4 bg-red-600 text-white m-8 w-full"
        >
          Yes, Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
