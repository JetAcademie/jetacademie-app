import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListItem = ({ to, label }) => {
  return (
    <li className="hover:bg-gray-100 px-4 py-2">
      <Link to={to}>{label}</Link>
    </li>
  );
};

ListItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ListItem;
