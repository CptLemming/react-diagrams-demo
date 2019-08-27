import { DefaultPortModel } from '@projectstorm/react-diagrams';

import DeviceLinkModel from "./model";

class DeviceLinkPortModel extends DefaultPortModel {
	createLinkModel() {
		return new DeviceLinkModel();
	}
}

export default DeviceLinkPortModel;
