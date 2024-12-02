import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavigationItem = ({ to, icon: Icon, label, onClick }) => (
    <li className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-white" />
        <Link
            to={to}
            onClick={onClick}
            className="text-white hover:bg-purple-600 px-2 py-1 rounded transition duration-300"
        >
            {label}
        </Link>
    </li>
);

NavigationItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default NavigationItem;
