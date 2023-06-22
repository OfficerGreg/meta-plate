import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Image } from 'react-konva';
import axios from 'axios';

const Gamba: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]); // Array to store the fetched cases
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState<HTMLImageElement[]>([]); // Array to store the loaded images

  const handleBeforeDraw = (context: Konva.Context) => {
    context.fillStyle = result;
    context.fillRect(200, 200, 200, 200);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('//localhost:5000/gamba');
      setCases(response.data); // Store the fetched cases in the state
      setResult(response.data.result);
      setDetail(response.data.detail);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadImage = async (caseIndex: number) => {
    try {
      const img = new window.Image();
      img.src = process.env.PUBLIC_URL + '/images/' + cases[caseIndex].detail + '.jpg';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      setImages((prevImages) => [...prevImages, img]); // Add the loaded image to the state array
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cases.length > 0) {
      setImages([]); // Reset the images array when cases change
      for (let i = 0; i < cases.length; i++) {
        loadImage(i);
      }
    }
  }, [cases]);

  return (
    <section>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {cases.map((caseItem, index) => (
            <React.Fragment key={index}>
              <Rect
                x={200 + index * 220} // Adjust the x position based on the index
                y={200}
                width={200}
                height={200}
                fill={caseItem.result}
                perfectDrawEnabled={false}
                listening={false}
                onBeforeDraw={handleBeforeDraw}
              />
              {images[index] && (
                <Image
                  x={200 + index * 220} // Adjust the x position based on the index
                  y={200}
                  width={200}
                  height={200}
                  image={images[index]}
                />
              )}
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
      <button onClick={fetchData}>Roll</button>
    </section>
  );
};

export default Gamba;
