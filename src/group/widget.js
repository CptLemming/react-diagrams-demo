import React, { useState } from "react";

const GroupNodeWidget = props => {
  const [isOpen, toggleOpen] = useState(true);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleOpen(!isOpen);
  };

  return (
    <div className="group-node">
      <button onClick={handleClick} className="group-node-label">
        {props.node.label}

        <div>{isOpen ? "-" : "+"}</div>
      </button>

      {isOpen && <div className="group-node-children">
        {props.children}
      </div>}
    </div>
  );
};

export default GroupNodeWidget;
