import { DefaultLinkModel } from '@projectstorm/react-diagrams';

class DeviceLinkModel extends DefaultLinkModel {
	constructor() {
		super({
			type: 'device-link',
			width: 10
		});
	}
}

export default DeviceLinkModel;
