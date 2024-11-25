interface SingleImageProps {
  image: any;
  handleCloseSingleImage: () => void;
}

function SingleImage({ image, handleCloseSingleImage }: SingleImageProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-3 bg-black/50 z-50">
      <div className="w-[40rem] h-[40rem]">
        <div className="text-right">
          <i
            className="fa-solid fa-xmark fa-2x cursor-pointer text-white/50"
            onClick={handleCloseSingleImage}
          ></i>
        </div>
        <div className="flex flex-col items-center">
          <img src={image?.url} className="w-5/6" alt={image?.title} />
          <h1 className="font-bold text-black text-2xl bg-white p-5 w-5/6">
            {image?.title}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default SingleImage;
