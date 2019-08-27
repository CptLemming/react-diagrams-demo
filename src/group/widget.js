import React, { useState } from "react";
import { PortWidget } from "@projectstorm/react-diagrams";

const GroupNodeWidget = props => {
  const [isOpen, toggleOpen] = useState(true);

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleOpen(!isOpen);
  };

  return (
    <div className="group-node">
      <div className="group-node-details">
        <button onClick={handleClick} className="group-node-label">
          {props.node.label}
          <div>{isOpen ? "-" : "+"}</div>
        </button>

        <div className="group-node-ports">
          <PortWidget engine={props.engine} port={props.node.getPort(`${props.node.id}-in`)}>
            <div className="circle-port" />
          </PortWidget>
          <PortWidget engine={props.engine} port={props.node.getPort(`${props.node.id}-out`)}>
            <div className="circle-port" />
          </PortWidget>
        </div>
      </div>

      {isOpen && <div className="group-node-children">
        {props.children}
      </div>}
    </div>
  );
};

export default GroupNodeWidget;
