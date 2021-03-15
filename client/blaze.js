import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';

export default async function blaze() {
  const model = await blazeface.load();
  console.log('RAZANGA');
  const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
  const video = document.getElementById('hello');
  console.log(video);

  video.onloadeddata = async (event) => {
    const predictions = await model.estimateFaces(
      document.querySelector('video'),
      returnTensors
    );
    console.log(
      'Yay! The readyState just increased to  ' +
        'HAVE_CURRENT_DATA or greater for the first time.'
    );
  };

  if (predictions.length > 0) {
    for (let i = 0; i < predictions.length; i++) {
      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];

      // Render a rectangle over each detected face.
      ctx.fillRect(start[0], start[1], size[0], size[1]);
    }
  }
}
