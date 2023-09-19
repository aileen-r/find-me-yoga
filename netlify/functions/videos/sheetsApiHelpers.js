// TODO get some JSDoc
function formatRowIntoEntity(row, properties) {
	const entity = {};
	properties.forEach((property, i) => {
		if (row[i] === "TRUE" || row[i] === "FALSE") {
			entity[property] = row[i] === "TRUE";
			return;
		}
		entity[property] = row[i];
	});
	return entity;
}

export { formatRowIntoEntity };
