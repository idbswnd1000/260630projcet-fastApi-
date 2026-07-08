import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SalesPage from "./pages/SalesPage";

function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/sales" element={<SalesPage />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;

const AppLayout = styled.div`
    min-height: 100vh;
    background: #f5f7fb;
    color: #111827;
    font-family: Pretendard, "Noto Sans KR", Arial, sans-serif;
`;