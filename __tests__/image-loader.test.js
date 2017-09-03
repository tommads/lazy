const { 
	loadImage, 
	getOnImageLoadCallback,
	loadImageElement,
	loadPictureElement,
	loadBackgroundImage 
} = require('../js/lazy-image-loader');

const { 
	imagePath,
	gifPath,
	fakeImagePath
} = require('../js/test-helpers');

describe('Image loader tests', function() {
	
		it('Should respond appropriately when passed a correct file path', function(done) {
			loadImage(imagePath).then(result => expect(result.loaded).toEqual(true));
			done();
		});

		it('Should respond appropriately when passed an incorrect file path', function(done) {
			loadImage(fakeImagePath).then(result => expect(result.loaded).toEqual(false));
			done();
		});

		it('Should respond appropriately when passed a correct GIF file path', function(done) {
			loadImage(gifPath).then(result => expect(result.loaded).toEqual(true));
			done();
		});
	
});

describe('Should detect the correct callback for Image, Picture and CSS background', function() {

	const image = document.createElement('img');
	const picture = document.createElement('picture');
	const div = document.createElement('div');

	it('Should return the correct Image element loader', function() {
		const result = getOnImageLoadCallback(image);
		expect(result).toBe(loadImageElement);
	});

	it('Should return the correct CSS background element loader', function() {
		const result = getOnImageLoadCallback(div);
		expect(result).toBe(loadBackgroundImage);
	});

});