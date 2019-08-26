import { DefaultNodeModel } from '@projectstorm/react-diagrams';

class GroupNodeModel extends DefaultNodeModel {
    constructor(options = {}) {
		super({
			...options,
			type: 'group-node'
		});
        this.id = options.id;
        this.label = options.label;
        this.childNodes = [];
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

    addNode(...node) {
        this.childNodes.push(...node);
    }
    
    getPorts() {
        /** update ports data */
        this.ports = this.childNodes.reduce((ports, node) => Object.assign(ports, node.getPorts()), {});
        return this.ports;
    }

    setPosition(x, y) {
        /** update ports data */
        this.ports = this.childNodes.reduce((ports, node) => Object.assign(ports, node.getPorts()), {});
        super.setPosition(x, y);
    }
}

export default GroupNodeModel;
