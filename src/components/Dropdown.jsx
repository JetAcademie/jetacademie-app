import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Dropdown = ({ isOpen, items, baseLink }) => {
    if (!isOpen) return null;

    return (
        <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
            {items.map((item, index) => (
                <li key={index} className="hover:bg-gray-100 px-4 py-2">
                    <Link
                        to={`${baseLink}/${item.slug || item.link}`}
                        className="block"
                    >
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

Dropdown.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string,
            link: PropTypes.string,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    baseLink: PropTypes.string.isRequired,
};

export default Dropdown;
