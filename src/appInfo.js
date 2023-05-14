const infoModule = {};
let info = {};

infoModule.setValue = (key, value) => {
	info[key] = value;
	localStorage[key] = value;
};

infoModule.getValue = (key) => {
	return info[key];
};

infoModule.removeValue = (key) => {
	info[key] = null;
	localStorage[key] = null;
};

export default infoModule;
