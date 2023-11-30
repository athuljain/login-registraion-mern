import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const nav = useNavigate();

  function ProductPage() {
    nav("/adminProducts");
  }
  function UsersPage() {
    nav("/adminUsers");
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <button onClick={ProductPage}>Products</button>
        <button onClick={UsersPage}>Users</button>
      </div>
    </div>
  );
}
