import React from "react";

const Popup = ({ props }) => {
  const { id, name, description } = props;
  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  );
};

export default Popup;
