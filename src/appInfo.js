const infoModule = {};
let info = {};

infoModule.setValue = (key, value) => {
	info[key] = value;
};

infoModule.getValue = (key) => {
	return info[key];
};

infoModule.removeValue = (key) => {
	info[key] = null;
};
