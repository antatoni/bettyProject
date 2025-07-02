import { type Picture } from '../getPictures';

interface CardProps {
  pictureObj: Picture;
}

const Card = ({ pictureObj }: CardProps) => {
  console.log(`width: ${pictureObj.width}
    height:${pictureObj.height}`);
  return (
    <div className="m-2">
      <img
        src={pictureObj.url}
        alt={`Random picture ${pictureObj.id}`}
        style={{
          width: `${pictureObj.width}px !important`,
          height: `${pictureObj.height}px !important`,
        }}
      />
    </div>
  );
};

export default Card;
