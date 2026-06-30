import { useState } from "react";

import EmployeePage from "./pages/EmployeePage";
import TodoPage from "./pages/TodoPage";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import UserPage from "./pages/UserPage";

function App() {
    const [page, setPage] = useState("employees");

    return (
        <div style={{ width: 1000, margin: "30px auto" }}>
            <h1>React Query CRUD</h1>

            <button onClick={() => setPage("employees")}>Employees</button>
            <button onClick={() => setPage("todos")}>Todos</button>
            <button onClick={() => setPage("products")}>Products</button>
            <button onClick={() => setPage("sales")}>Sales</button>
            <button onClick={() => setPage("users")}>Users</button>

            <hr />

            {page === "employees" && <EmployeePage />}
            {page === "todos" && <TodoPage />}
            {page === "products" && <ProductPage />}
            {page === "sales" && <SalePage />}
            {page === "users" && <UserPage />}
        </div>
    );
}

export default App;