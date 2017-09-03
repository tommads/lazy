const lazyImageClass = 'lazy-image';
const lazyImageHolderClass = 'lazy-image-holder';
const imagePath = '../images/bb.png';
const imagePath2 = '../images/earth.jpg';
const imagePath3 = '../images/light.jpg';
const imagePath4 = '../images/logo.png';
const gifPath = '../images/brent.gif';
const fakeImagePath = '../images/fake.jpg';
const fakelazyImageClass = 'fake-lazy-image';

function createDom(src) {

	const holder = document.createElement('div');
	const image = document.createElement('image');

	holder.classList.add(lazyImageHolderClass);
	image.classList.add(lazyImageClass);
	image.setAttribute('data-src', src);
	holder.appendChild(image);

	document.body.appendChild(holder);

	return { image, holder };

}

function cleanUpDom() {

	const holders = Array.from(document.querySelectorAll(`.${lazyImageClass}`));
	holders.forEach(function(holder) {
		holder.parentNode.removeChild(holder);
	});
	
}

module.exports = {
	lazyImageClass,
	imagePath,
	imagePath2,
	imagePath3,
	imagePath4,
	gifPath,
	fakeImagePath,
	createDom,
	cleanUpDom,
	fakelazyImageClass
};