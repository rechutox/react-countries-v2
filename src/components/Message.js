import React from "react";

function Message({ type = "info", children }) {
  const className = `Message Message--${type}`;
  return <div className={className}>{children}</div>;
}

export default Message;
