import { useEffect, useState, useRef } from 'react';
import {
  useHeigthContext,
  usePictureContext,
  useWidthContext,
} from './Contexts/PictureContext';
import getPictures, { type Picture } from './getPictures';

const Carousel = () => {
  const { numOfPics } = usePictureContext();
  const { picWidth } = useWidthContext();
  const { picHeight } = useHeigthContext();

  const [pictureArr, setPictureArr] = useState<Picture[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picturesToShow, setPicturesToShow] = useState(5);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const SCROLL_AMOUTH = 1;
  const SCROLL_THROTTLE = 250;
  const GAP_SIZE = 16; //m-2 is equal to 8px on each side!

  useEffect(() => {
    const updatePicturesToShow = () => {
      const screenWidth = window.innerWidth;
      setWindowWidth(screenWidth);
      if (screenWidth < 640) {
        setPicturesToShow(1);
      } else if (screenWidth < 768) {
        setPicturesToShow(2);
      } else if (screenWidth < 1024) {
        setPicturesToShow(3);
      } else if (screenWidth < 1280) {
        setPicturesToShow(4);
      } else {
        setPicturesToShow(5);
      }
    };

    updatePicturesToShow();
    window.addEventListener('resize', updatePicturesToShow);
    return () => {
      window.removeEventListener('resize', updatePicturesToShow);
    };
  }, []);

  useEffect(() => {
    if (numOfPics > 0 && picWidth > 0 && picHeight > 0) {
      const pictures = getPictures(numOfPics, picWidth, picHeight);
      setPictureArr(pictures);
      setCurrentIndex(0);
    }
  }, [numOfPics, picWidth, picHeight]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < SCROLL_THROTTLE) {
        return; // if someone is spamming the scroll prevent it
      }
      lastScrollTime.current = now;

      if (event.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('wheel', handleWheel, {
        passive: false,
      });

      return () => {
        carouselElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, [currentIndex, pictureArr.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, pictureArr.length - picturesToShow);

      if (prevIndex >= maxIndex) {
        return 0;
      }
      return Math.min(prevIndex + SCROLL_AMOUTH, maxIndex);
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return Math.max(0, pictureArr.length - picturesToShow);
      }
      return Math.max(0, prevIndex - SCROLL_AMOUTH);
    });
  };

  const getVisibleRange = () => {
    const bufferSize = 6;
    const start = Math.max(0, currentIndex - bufferSize);
    const end = Math.min(
      pictureArr.length - 1,
      currentIndex + picturesToShow + bufferSize
    );
    return { start, end };
  };

  const isImageInLoadRange = (index: number) => {
    const { start, end } = getVisibleRange();
    return index >= start && index <= end;
  };

  const getProgressPercentage = () => {
    const totalSlides = Math.max(1, pictureArr.length - picturesToShow + 1);
    return (currentIndex / (totalSlides - 1)) * 100;
  };

  const getResponsiveImageSize = () => {
    const containerPadding = 24;
    const marginSpace = 120;
    const availableWidth = windowWidth - containerPadding - marginSpace;

    const totalGaps = (picturesToShow - 1) * GAP_SIZE;
    const maxImageWidth = (availableWidth - totalGaps) / picturesToShow;

    const minImageWidth = 120;
    const maxAllowedWidth = 300;

    const displayWidth = Math.max(
      minImageWidth,
      Math.min(maxImageWidth, maxAllowedWidth, picWidth || 300)
    );

    const aspectRatio = (picHeight || 300) / (picWidth || 300);
    const displayHeight = displayWidth * aspectRatio;

    return { displayWidth, displayHeight };
  };

  const { displayWidth, displayHeight } = getResponsiveImageSize();

  const containerWidth =
    picturesToShow * displayWidth + (picturesToShow - 1) * GAP_SIZE;

  return (
    <div
      ref={carouselRef}
      className="flex flex-col items-center justify-center bg-white p-3 border-2 rounded-4xl ml-15 mr-15 cursor-grab active:cursor-grabbing"
      tabIndex={0}
    >
      <div className="overflow-hidden" style={{ width: `${containerWidth}px` }}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              currentIndex * (displayWidth + GAP_SIZE)
            }px)`,
          }}
        >
          {pictureArr.map((pictureObj, index) => (
            <div
              key={pictureObj.id}
              className="flex-shrink-0 m-2 min-w-0 "
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`,
              }}
            >
              {isImageInLoadRange(index) ? (
                <img
                  src={pictureObj.url}
                  alt={`Random picture ${pictureObj.id}`}
                  className="w-full h-full object-cover rounded transition-opacity duration-300"
                  loading="lazy"
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  style={{ opacity: '0' }}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-6 h-6 text-gray-500 mx-auto mb-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-xs text-gray-500">#{index + 1}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6 w-full">
        <div className="w-64">
          <div className="relative">
            {/* Progress Bar Track */}
            <div className="bg-gray-300 rounded-full h-1 w-full">
              <div
                className="bg-gray-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>

            {/* Moving Red Dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full shadow-md transition-all duration-500 -ml-1.5"
              style={{ left: `${getProgressPercentage()}%` }}
            />
          </div>

          {/* Position Text */}
          <div className="text-xs text-center text-gray-600 mt-2">
            {currentIndex + 1} -{' '}
            {Math.min(currentIndex + picturesToShow, pictureArr.length)} of{' '}
            {pictureArr.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
