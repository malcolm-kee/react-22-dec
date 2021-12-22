import PropTypes from 'prop-types';

/**
 * Other than color, all the props will be applied to the span element.
 */
export const Badge = ({ children, color, className, ...props }) => {
  console.log({ props });

  return (
    <span
      {...props}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        classByColor[color] || ''
      } ${className || ''}`}
    >
      {children}
    </span>
  );
};

const classByColor = {
  green: 'bg-green-100 text-green-800',
  gray: 'bg-gray-100 text-gray-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['gray', 'green', 'red', 'yellow']),
};
