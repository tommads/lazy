const lazy = require('./image-loader');
const { 
	showImage,
	loadImage, 
	getLazyImages } = lazy;

function getLazyImagesPositions(selector) {
	const lazyImages = getLazyImages(selector);
	return getImagePositions(lazyImages);
}

function getImagePositions(images) {
	return images.map(image => ({ holderPosition: getHolderPosition(image.holder), ...image }));
}

function getHolderPosition(holder) {
	return holder.getBoundingClientRect();
}

function getScrollPosition() {
	const x = window.scrollX;
	const y = window.scrollY;
	return { x, y };
}

function getWindowSize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	return { width, height };
}

function getWindowBoundaries() {
	const { y } = getScrollPosition();
	const { height } = getWindowSize();
	const yTop = y;
	const yBottom = y + height;
	return { yTop, yBottom	};
}

function getImagesInView(images) {
	const { yTop, yBottom } = getWindowBoundaries();
	const unloadedImages = getUnloadedImages(images);
	return unloadedImages.filter(image => isInViewVertically(image.holderPosition.top, yTop, image.holderPosition.bottom, yBottom));
}

function isInViewVertically(posYtop, windowYtop, posYbottom, windowYbottom) {
	return posYtop >= windowYtop && posYbottom <= windowYbottom;
}

function getUnloadedImages(images) {
	return images.filter(image => !image.loaded);
}

function loadImagesInView(images) {
	const imagesInView = getImagesInView(images);
	return Promise.all(imagesInView.map(image => showImage(image)));
}

module.exports = {
	getLazyImagesPositions,
	getUnloadedImages,
	loadImagesInView,
	getImagePositions,
	isInViewVertically
};