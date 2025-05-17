import React from "react";

const Button = (({ children, PlayerState, ButtonClass, ref}) => {
  return (
    <button ref={ref} onClick={PlayerState} className={ButtonClass}>
      {children}
    </button>
  );
});
export default Button;
