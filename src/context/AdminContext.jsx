import { createContext, useState } from 'react';
import PropTypes from "prop-types";


const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(true);

    const toggleAdmin = () => {
        setIsAdmin((prev) => !prev);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};


AdminProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminContext;
