import PropTypes from 'prop-types';

export const Button = ({ variant, ...props }) => (
  <button
    type="button"
    className={`inline-flex justify-center items-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
      classByVariant[variant] || ''
    }`}
    {...props}
  />
);

const classByVariant = {
  primary: 'text-white bg-pink-600 hover:bg-pink-700 border-transparent',
  outline: 'text-pink-500 bg-white hover:text-pink-700 border-pink-500',
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'outline']),
};
