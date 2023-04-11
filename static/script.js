function displayImage() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageUrl = event.target.result;
      processButton.style.display = 'block';

      const tempImageElement = document.createElement('img');
      tempImageElement.onload = function() {
       
        let newWidth = tempImageElement.width;
        let newHeight = tempImageElement.height;
        if (newWidth > 500) {
          newWidth = 500;
          newHeight = Math.floor(tempImageElement.height * (newWidth / tempImageElement.width));
        }
        if (newHeight > 500) {
          newHeight = 500;
          newWidth = Math.floor(tempImageElement.width * (newHeight / tempImageElement.height));
        }

        // Create a canvas element to draw and resize the image
        const canvasElement = document.createElement('canvas');
        canvasElement.width = newWidth;
        canvasElement.height = newHeight;
        const canvasContext = canvasElement.getContext('2d');
        canvasContext.drawImage(tempImageElement, 0, 0, newWidth, newHeight);

        // Create the image element from the canvas data URL
        const imageElement = document.createElement('img');
        imageElement.src = canvasElement.toDataURL();
        imageElement.style.borderRadius = '9px';

        // Remove previous image element, if any
        const previousImageElement = document.querySelector('img');
        if (previousImageElement) {
          previousImageElement.remove();
        }

        document.body.appendChild(imageElement);
        fileInput.value = file.name;
        const imageData = tf.browser.fromPixels(imageElement);
        console.log(imageData);
      };
      tempImageElement.src = imageUrl;
    };
    reader.readAsDataURL(file);
  }
}
