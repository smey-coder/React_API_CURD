import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-light p-3 vh-100" style={{ width: "220px" }}>
      <h5>Menu</h5>

      <Link className="d-block mb-2" to="/">
        📦 Products
      </Link>

      <Link className="d-block mb-2" to="/add">
        ➕ Add Product
      </Link>
    </div>
  );
}

export default Sidebar;