import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="flex justify-center text-xl">Books</h1>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Author</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <div className="flex justify-center gap-x-4">
                      <Link to={"/books/details/${book._id}"}>
                        <MdOutlineRemoveRedEye className="text-2xl text-green-800" />
                      </Link>
                      <Link to={"/books/edit/${book._id}"}>
                        <MdModeEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={"/books/delete/${book._id}"}>
                        <MdDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Home;
