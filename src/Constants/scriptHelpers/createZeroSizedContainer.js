function createZeroSizedContainer (id) {
	const container = document.createElement('div');
	container.style.height = '0px';
	container.style.width = '0px';
	if (id) {
		container.id = id;
	}
	return container
}
export default createZeroSizedContainer;