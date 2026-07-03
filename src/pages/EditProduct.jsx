import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setName(res.data.name);
    setPrice(res.data.price);
    setDescription(res.data.description);
  };

  const update = async (e) => {
    e.preventDefault();

    await API.put(`/products/${id}`, {
      name,
      price,
      description,
    });
    toast.success("🎉Product updated successfully!", {
        style: {
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            color: "#ffffff",
            fontWeight: "600",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontSize: "14px",
            letterSpacing: "0.3px",
        },
    });
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>

      <form onSubmit={update}>
        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );

}
// const update = async (e) => {
//   e.preventDefault();

//   try {
//     await API.put(`/products/${id}`, {
//       name,
//       price,
//       description,
//     });

//     // ✅ SUCCESS MESSAGE
//     Swal.fire({
//       icon: "success",
//       title: "Updated!",
//       text: "Product updated successfully",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     navigate("/");

//   } catch (error) {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "Update failed",
//     });
//   }
// };

export default EditProduct;