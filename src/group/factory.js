import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

import GroupModel from "./model";
import GroupWidget from "./widget";

class GroupNodeFactory extends AbstractReactFactory {
	constructor() {
		super('group-node');
	}

	generateModel(event) {
		return new GroupModel();
	}

	generateReactWidget(event) {
        const groupNode = event.model;
        const children = groupNode.childNodes.map(childNode => {
            const nodeType = childNode.getType();
            const nodeFactory = this.engine.getNodeFactories().getFactory(nodeType);

            return (
                <React.Fragment key={childNode.id}>
                    {nodeFactory.generateReactWidget({ model: childNode })}
                </React.Fragment>
            );
        });

		return <GroupWidget engine={this.engine} node={event.model} children={children} />;
	}
}

export default GroupNodeFactory;
