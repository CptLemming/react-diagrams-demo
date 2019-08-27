import { DefaultNodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';

class GroupNodeModel extends DefaultNodeModel {
    constructor(options = {}) {
		super({
			...options,
			type: 'group-node'
		});
        this.id = options.id;
        this.label = options.label;
        this.childNodes = [];

		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: `${this.id}-in`
			})
		);
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: `${this.id}-out`
			})
		);
    }

	serialize() {
		return {
			...super.serialize(),
            label: this.options.label,
            id: this.options.id
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.id = ob.id;
		this.label = ob.label;
    }

    addNode(node) {
        node.setParent(this);
        this.childNodes.push(node);
        return node;
    }

    getNodes() {
        return this.childNodes;
    }

    rebuildPorts() {
        const portsIn = {};
        const portsOut = {};

        this.portsIn.forEach(port => {
            portsIn[port.getName()] = port;
        })
        this.portsOut.forEach(port => {
            portsOut[port.getName()] = port;
        });

        this.ports = this.childNodes.reduce((ports, node) => Object.assign(ports, node.getPorts()), Object.assign(portsIn, portsOut, {}));
    }

    getPorts() {
        this.rebuildPorts();
        return this.ports;
    }

    setPosition(x, y) {
        this.rebuildPorts();
        super.setPosition(x, y);
    }
}

export default GroupNodeModel;
