import React from 'react';

function InputNormal({ ...rest }) {
  return (
    <div>
      <input type="text" {...rest} />
    </div>
  );
}

export default InputNormal;
