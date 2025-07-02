import { useRef } from 'react';
import {
  useHeigthContext,
  usePictureContext,
  useWidthContext,
} from '../Contexts/PictureContext';

const userOptionsPanel = () => {
  const { setNumOfPics } = usePictureContext();
  const { setPicWidtch } = useWidthContext();
  const { setPicHeight } = useHeigthContext();

  const picNumInputRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  const clearInputs = () => {
    picNumInputRef.current!.value = '';
    widthInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  const handleSubmit = () => {
    const numValue = picNumInputRef.current?.value;
    const widthValue = widthInputRef.current?.value;
    const heightValue = heightInputRef.current?.value;

    if (
      !numValue ||
      isNaN(Number(numValue)) ||
      !widthValue ||
      isNaN(Number(widthValue)) ||
      !heightValue ||
      isNaN(Number(heightValue))
    ) {
      alert(`Inputs can only be numerals !`);

      clearInputs();

      return;
    }

    if (Number(widthValue) > 5000 || Number(heightValue) > 5000) {
      alert(`Width and height can't be greater than 5000 !`);
      clearInputs();
      return;
    }

    if (Number(widthValue) <= 0 || Number(heightValue) <= 0) {
      alert(`Width and height can't be less than 0 !`);
      clearInputs();
      return;
    }

    const picNumber = parseInt(numValue || '0');
    const widthNumber = parseInt(widthValue || '0');
    const heightNumber = parseInt(heightValue || '0');
    setNumOfPics(picNumber);
    setPicWidtch(widthNumber);
    setPicHeight(heightNumber);

    clearInputs();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <input
          type="text"
          placeholder="Number of pictures ..."
          ref={picNumInputRef}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Width of picture ..."
          ref={widthInputRef}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Height of pictures ..."
          ref={heightInputRef}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium md:whitespace-nowrap"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default userOptionsPanel;
