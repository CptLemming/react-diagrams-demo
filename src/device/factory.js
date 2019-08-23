import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

import DeviceModel from "./model";
import DeviceWidget from "./widget";

class DeviceNodeFactory extends AbstractReactFactory {
	constructor() {
		super('device-node');
	}

	generateModel(event) {
		return new DeviceModel();
	}

	generateReactWidget(event) {
		return <DeviceWidget engine={this.engine} node={event.model} />;
	}
}

export default DeviceNodeFactory;
