import * as React from 'react';
import PropTypes from 'prop-types';
import { callAll } from '../util/call-all';

export const TextInput = React.forwardRef(function TextInput(
  { onChangeValue, onChange, ...props },
  forwardedRef
) {
  return (
    <input
      type="text"
      {...props}
      onChange={callAll(
        onChange,
        onChangeValue && ((ev) => onChangeValue(ev.target.value))
      )}
      ref={forwardedRef}
    />
  );
});

TextInput.propTypes = {
  onChangeValue: PropTypes.func,
};
