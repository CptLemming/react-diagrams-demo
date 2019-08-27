import React, { useEffect, useCallback } from 'react';
import createEngine, { DiagramModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

import DagreEngine from "./layout/dagre";
import DeviceFactory from "./device/factory";
import DeviceModel from "./device/model";
import DeviceLinkFactory from "./deviceLink/factory";
import GroupFactory from "./group/factory";
import GroupModel from "./group/model";

import './App.css';

const dagreEngine = new DagreEngine({
  graph: {
    rankdir: 'RL',
    ranker: 'longest-path'
  },
  includeLinks: true
});

const engine = createEngine();

engine.getNodeFactories().registerFactory(new GroupFactory());
engine.getNodeFactories().registerFactory(new DeviceFactory());
engine.getLinkFactories().registerFactory(new DeviceLinkFactory());

const model = new DiagramModel();

const node1 = new DeviceModel({ id: '1', manufacturer: 'Type-R', label: 'Calrec Core' });
// node1.setPosition(50, 50);

const node2 = new DeviceModel({ id: '2', label: 'IO Box' });
// node2.setPosition(400, 50);

// const link1 = new DeviceLinkModel();
// link1.setSourcePort(node1.getPort('1-out'));
// link1.setTargetPort(node2.getPort('2-in'));

const link1 = node1.getPort('1-out')
  .link(node2.getPort('2-in'), engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME));

// model.addAll(node1, node2, link1);
model.addNode(node1);
model.addNode(node2);
model.addLink(link1);

const group1 = new GroupModel({ id: '1-group', label: 'Group 1' });
const node3 = new DeviceModel({ id: '3', manufacturer: 'Type-R', label: 'Calrec Core' });
const node4 = new DeviceModel({ id: '4', label: 'IO Box' });

group1.addNode(node3);
group1.addNode(node4);

const link2 = node1.getPort('1-out')
  .link(group1.getPort('1-group-in'), engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME));

model.addNode(group1);
model.addLink(link2);

engine.setModel(model);

const BodyWidget = props => {
  const doLayout = useCallback(() => {
    dagreEngine.redistribute(props.model);
    props.engine
			.getLinkFactories()
			.getFactory(PathFindingLinkFactory.NAME)
			.calculateRoutingMatrix()
    props.engine.repaintCanvas();
  }, [props.engine, props.model]);

  const doAddNode = useCallback(() => {
    const modelEngine = props.engine.getModel();
    const newNode = new DeviceModel({ id: String(modelEngine.getNodes().length), label: `Added Core ${modelEngine.getNodes().length}` });

    modelEngine.addNode(newNode);
    doLayout();
  }, [props.engine, doLayout]);

  useEffect(() => {
    const interval = setTimeout(() => {
      doLayout();
    }, 500);

    return () => {
      clearInterval(interval);
    }
  });

  return (
    <div className="app-container">
      <div>
        <button onClick={doLayout}>Do layout</button>
        <button onClick={doAddNode}>Add Node</button>
      </div>

      <CanvasWidget className="diagram-container" engine={props.engine} />
    </div>
  );
}

const App = () => (
  <BodyWidget engine={engine} model={model}/>
);

export default App;
