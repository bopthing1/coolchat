const infoModule = {};

infoModule.setValue = (key, value) => {
	return localStorage.setItem(key, value);
};

infoModule.getValue = (key) => {
	console.log(key, localStorage.getItem(key));
	return localStorage.getItem(key);
};

infoModule.removeValue = (key) => {
	return localStorage.removeItem(key);
};

export default infoModule;
