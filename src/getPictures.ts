export interface Picture {
  id: number;
  url: string;
  width: number;
  height: number;
}

const getPictures = (limit: number, width: number, height: number) => {
  const pictureArr = [];
  for (let i = 0; i < limit; i++) {
    const pictureUrl = `https://picsum.photos/${width}/${height}?random=${i}`;
    pictureArr.push({ id: i, url: pictureUrl, width: width, height: height });
  }
  console.log(pictureArr);
  return pictureArr;
};

export default getPictures;
