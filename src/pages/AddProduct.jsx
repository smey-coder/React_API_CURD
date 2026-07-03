import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // ❌ Validation rules
    if (!name || !price || !description) {
        toast.error("⚠️ Please fill all fields", {
        style: {
            background: "#ef4444",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "13px",
        },
        });
        return;
    }

    if (isNaN(price) || Number(price) <= 0) {
        toast.error("⚠️ Price must be a valid number", {
        style: {
            background: "#ef4444",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "13px",
        },
        });
        return;
    }

    try {
        await API.post("/products", {
        name,
        price,
        description,
        });

        toast.success("🎉 Product added successfully!");

        navigate("/");
    } catch (error) {
        toast.error("❌ Server error: Failed to create product");
    }
    };

  return (
    <Layout>
      <h3>Add Product</h3>

      <form onSubmit={submit} className="card p-4 shadow-sm">
        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-success">Save</button>
      </form>
    </Layout>
  );

  
}
const submit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/products", {
      name,
      price,
      description,
    });

    toast.success("🎉 Product added successfully!", {
    style: {
        background: "linear-gradient(135deg, #0f172a, #1e293b)", // dark professional
        color: "#f8fafc",
        fontWeight: "600",
        borderRadius: "14px",
        padding: "14px 18px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        fontSize: "13px",
        letterSpacing: "0.4px",
        border: "1px solid rgba(255,255,255,0.08)",
    },
    });

    navigate("/");

  } catch (error) {
    toast.error("Failed to create product");
  }
};
//Show Message with sweetalert2
// const submit = async (e) => {
//   e.preventDefault();

//   try {
//     await API.post("/products", {
//       name,
//       price,
//       description,
//     });

//     // ✅ SUCCESS MESSAGE HERE
//     Swal.fire({
//       icon: "success",
//       title: "Success",
//       text: "Product added successfully!",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     navigate("/");

//   } catch (error) {
//     // ❌ ERROR MESSAGE HERE
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "Failed to add product",
//     });
//   }
// };


export default AddProduct;