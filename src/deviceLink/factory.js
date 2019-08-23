import React from "react";
import {
    DefaultLinkFactory,
} from '@projectstorm/react-diagrams';

import DeviceLinkModel from './model';
import DeviceLinkSegment from "./segment";

class DeviceLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('device-link');
	}

	generateModel() {
		return new DeviceLinkModel();
	}

	generateLinkSegment(model, selected, path) {
		return (
			<g>
				<DeviceLinkSegment model={model} path={path} />
			</g>
		);
	}
}

export default DeviceLinkFactory;
