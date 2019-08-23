import { NodeModel } from '@projectstorm/react-diagrams';

import DeviceLinkPortModel from "../deviceLink/port";

class DeviceNodeModel extends NodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'device-node'
		});
        this.id = options.id;
        this.label = options.label;
        this.manufacturer = options.manufacturer || '';

		// setup an in and out port
		this.addPort(
			new DeviceLinkPortModel({
				in: true,
				name: `${this.id}-in`
			})
		);
		this.addPort(
			new DeviceLinkPortModel({
				in: false,
				name: `${this.id}-out`
			})
		);
	}

	serialize() {
		return {
			...super.serialize(),
            color: this.options.color,
            manufacturer: this.options.manufacturer
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.color = ob.color;
		this.manufacturer = ob.manufacturer;
	}
}

export default DeviceNodeModel;
