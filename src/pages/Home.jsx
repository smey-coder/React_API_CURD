import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load products",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirm = await Swal.fire({
        title: "Delete product?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
        try {
        await API.delete(`/products/${id}`);

        loadProducts();

        toast.success("🎉Product deleted successfully!", {
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

        } catch (error) {
        toast.error("❌ Failed to delete product.");
        }
    }
    };

  return (
    <Layout>
      <div className="d-flex justify-content-between mb-3">
        <h3>Products</h3>

        <Link to="/add" className="btn btn-primary">
          ➕ Add Product
        </Link>
      </div>

      {/* LOADING UI */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <table className="table table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <Link
                      className="btn btn-warning btn-sm me-2"
                      to={`/edit/${p.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Home;