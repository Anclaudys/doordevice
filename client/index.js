import ReactDOM from 'react-dom';
import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import { drawMesh } from './utils';
import init from './init';

let person;

function Main() {
  const camRef = useRef(null);
  const canvasRef = useRef(null);

  const runFaceMesh = async () => {
    const net = await facemesh.load({
      //Its the same height and width as the webcam component
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };
  console.log(
    'REFF================================================================================================================================================================================================================================',
    camRef
  );
  //window.alert(camRef)

  const detect = async (net) => {
    let vid;
    if (document.getElementById('container').children) {
      vid = document.getElementById('container').children[0];
    }

    if (
      typeof camRef.current !== 'undefined' &&
      camRef.current !== null //&&
      // camRef.current.video.readyState === 4
    ) {
      //Getting video and properties
      //const video = camRef.current.video; //Gets video
      const video = vid;
      person = true;
      //const videoWidth = camRef.current.video.videoWidth; //gets width
      //const videoHeight = camRef.current.video.videoHeight; //height
      //const videoHeight = vid.height
      //const videoWidth = vid.width

      //Set video size
      //camRef.current.video.width = videoWidth;
      //camRef.current.video.height = videoHeight;

      //Set Canvas size
      //canvasRef.current.width = videoWidth;
      //canvasRef.current.height = videoHeight;

      //Make Detection
      const face = await net.estimateFaces(video);
      console.log('FACEEEEE', face);

      //Get Canvas context for drawuing
      const ctx = canvasRef.current.getContext('2d'); ///????
      drawMesh(face, ctx);
    }
  };
  runFaceMesh();

  return (
    <div id="main" onLoad={init()}>
      <div id="navbar">
        <img src={`/madbat.png`} id="logo" />
        <h1>Knock-Knock Dashboard </h1>
      </div>
      <div id="container" ref={camRef}>
        {/* <video id="hello" ref ={camRef}/> */}
      </div>
      <div id="canvbox">
        <canvas id="canv" ref={canvasRef}></canvas>
        <span> </span>
        {person ? (
          <div> There is someone at the door! </div>
        ) : (
          <div>Nobody's at the the door</div>
        )}
      </div>
      <typography id="notes">
        The next step is to capture the IP address of the device where the video
        is coming from. This is already being console logged in the browser.
        <ol>
          <li>Render only video from computer that isn't serving</li>
          <li>Isolate the dom element that contains the video</li>
          <li>
            {' '}
            Make sure that the face detection function is only being invoked
            once it is sure that the video has loaded
          </li>
        </ol>
      </typography>
    </div>
  );
}

ReactDOM.render(<Main />, document.getElementById('app'));
