module.exports = function Create (key, value) {
	for(let i =0; i < key.length; i++){
		this[key[i]] = value[i];
	}
};