import React from "react";
import { PortWidget } from "@projectstorm/react-diagrams";

const DeviceNodeWidget = props => (
  <div className="device-node">
    <div className="device-node-manufacturer">{props.node.manufacturer}</div>
    <div className="device-node-label">{props.node.label}</div>
    <div className="device-node-ports">
      <PortWidget engine={props.engine} port={props.node.getPort(`${props.node.id}-in`)}>
        <div className="circle-port" />
      </PortWidget>
      <PortWidget engine={props.engine} port={props.node.getPort(`${props.node.id}-out`)}>
        <div className="circle-port" />
      </PortWidget>
    </div>
  </div>
);

export default DeviceNodeWidget;
