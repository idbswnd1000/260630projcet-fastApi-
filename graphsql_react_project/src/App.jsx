import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import EmployeePage from "./pages/EmployeePage";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";
import TodoPage from "./pages/TodoPage";
import SalePage from "./pages/SalePage";

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const active = location.pathname === to;

    return (
        <Link
            to={to}
            style={{
                ...styles.link,
                ...(active ? styles.activeLink : {}),
            }}
        >
            {children}
        </Link>
    );
};

function App() {
    return (
        <BrowserRouter>
            <nav style={styles.nav}>
                <NavLink to="/">직원</NavLink>
                <NavLink to="/products">상품</NavLink>
                <NavLink to="/users">회원</NavLink>
                <NavLink to="/todos">Todo</NavLink>
                <NavLink to="/sales">판매</NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<EmployeePage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/todos" element={<TodoPage />} />
                <Route path="/sales" element={<SalePage />} />
            </Routes>
        </BrowserRouter>
    );
}

const styles = {
    nav: {
        display: "flex",
        gap: "12px",
        padding: "18px 28px",
        backgroundColor: "#222",
    },
    link: {
        padding: "10px 18px",
        borderRadius: "6px",
        backgroundColor: "#444",
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
    },
    activeLink: {
        backgroundColor: "#1976d2",
    },
};

export default App;