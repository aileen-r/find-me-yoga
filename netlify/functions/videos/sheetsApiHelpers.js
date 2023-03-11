// TODO get some JSDoc
function formatRowIntoEntity(row, properties) {
	const entity = {};
	properties.forEach((property, i) => (entity[property] = row[i]));
	return entity;
}

export {formatRowIntoEntity};