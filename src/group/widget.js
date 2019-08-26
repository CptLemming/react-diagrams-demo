import React from "react";
// import { PortWidget } from "@projectstorm/react-diagrams";

const GroupNodeWidget = props => (
  <div className="group-node">
    <div>{props.node.label}</div>

    <div>
        {props.children}
    </div>
  </div>
);

export default GroupNodeWidget;
