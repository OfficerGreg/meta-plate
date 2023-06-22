import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect, Image } from 'react-konva';
import axios from 'axios';

import '../css/gamba.css';

const Gamba: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]); // Array to store the fetched cases
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState<HTMLImageElement[]>([]); // Array to store the loaded images
  const [isRolling, setIsRolling] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(1); // Current image index

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

  const loadImage = async (caseIndex: number, caseItem: any) => {
    try {
      const img = new window.Image();
      img.src = process.env.PUBLIC_URL + '/images/' + caseItem.detail + '.jpg';
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[caseIndex] = img; // Store the loaded image at the correct index
        return updatedImages;
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const startRollingAnimation = () => {
    setIsRolling(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (cases.length > 0) {
      setImages([]); // Reset the images array when cases change
      cases.forEach((caseItem, index) => {
        loadImage(index, caseItem);
      });
    }
  }, [cases]);

  useEffect(() => {
    // Update the image index when isRolling is true
    if (isRolling) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          // Check if the current image is the last image (6)
          if (prevIndex === 6) {
            return prevIndex; // Stay at image 6
          } else {
            return prevIndex + 1; // Move to the next image
          }
        });
      }, 200); // Change image every 1 second
  
      return () => {
        clearInterval(interval); // Cleanup the interval on component unmount
        if (currentImageIndex === 6) {
          setIsRolling(false); // Stop the animation if the last image is reached
        }
      };
    }
  }, [isRolling, currentImageIndex]);
  

  const path_test = process.env.PUBLIC_URL + '/images/case_anim/' + currentImageIndex + '.png';

  const imgPath = new window.Image();
  imgPath.src = path_test;

  return (
    <section>
      <Stage width={window.innerWidth - 200} height={220} style={{ marginTop: 100 }}>
        <Layer>
          <div>
            <Rect
              x={window.innerWidth / 2 - 100}
              y={0}
              width={400}
              height={200}
              fill="white"
              perfectDrawEnabled={false}
              listening={false}
              onBeforeDraw={handleBeforeDraw}
            />
            <Image
              x={window.innerWidth / 2 - 100}
              y={0}
              width={400}
              height={200}
              image={imgPath}
            />
          </div>
          {isRolling && currentImageIndex === 6 && (
            <div className="cases-container">
              {cases.map((caseItem, index) => (
                <React.Fragment key={index}>
                  <Rect
                    x={index * 220}
                    y={20}
                    width={200}
                    height={200}
                    fill={caseItem.result}
                    perfectDrawEnabled={false}
                    listening={false}
                    onBeforeDraw={handleBeforeDraw}
                  />
                  {images[index] && (
                    <Image
                      x={index * 220}
                      y={0}
                      width={200}
                      height={200}
                      image={images[index]}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </Layer>
      </Stage>
      {!isRolling ? (
        <button onClick={startRollingAnimation}>Open</button>
      ) : null}
    </section>
  );
};

export default Gamba;
