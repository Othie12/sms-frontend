import { constants } from 'buffer';
import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const CameraAvatarEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.2);
  const editorRef = useRef<AvatarEditor>(null);

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const btn = document.getElementById('btn');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);

        // Stop the stream and close the camera
        btn?.addEventListener('click', () => stream.getTracks().forEach(track => track.stop()));
        //stream.getTracks().forEach(track => track.stop());
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  return (
    <div>
      <button id='btn' className='rounded-md selectedinputstyle p-2 m-2 text-white' onClick={handleCapture}>Capture Photo</button>

      {image && (
        <div>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            scale={scale}
          />
          <div>
            <label>Scale:</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraAvatarEditor;
