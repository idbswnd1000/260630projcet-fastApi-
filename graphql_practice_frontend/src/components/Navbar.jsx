import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    return (
        <Container>
            <Logo>📊 Sales Dashboard</Logo>

            <Menu>
                <MenuItem to="/">Dashboard</MenuItem>
                <MenuItem to="/sales">Sales</MenuItem>
            </Menu>
        </Container>
    );
};

export default Navbar;

const Container = styled.nav`
    height: 76px;
    background: white;
    border-bottom: 1px solid #e5e7eb;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 48px;
`;

const Logo = styled.h2`
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: #111827;
`;

const Menu = styled.div`
    display: flex;
    gap: 18px;
`;

const MenuItem = styled(Link)`
    padding: 10px 18px;
    border-radius: 12px;

    color: #374151;
    text-decoration: none;
    font-weight: 700;

    &:hover {
        background: #eef2ff;
        color: #4f46e5;
    }
`;