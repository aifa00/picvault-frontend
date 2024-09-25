function ImageList({
  image,
  itemsToDelete,
  setItemsToDelete,
  handleOpenEditImage,
}: any) {
  const toggleDeleteCheckBox = (imageId: string) => {
    if (itemsToDelete.includes(imageId)) {
      setItemsToDelete(
        [...itemsToDelete].filter((id: string) => imageId !== id)
      );
    } else {
      setItemsToDelete([...itemsToDelete, imageId]);
    }
  };

  return (
    <div
      className="flex p-2 items-center shadow-md relative shadow-gray-800 
    cursor-default bg-white rounded-lg mb-2 hover:bg-gray-200"
    >
      <p>{image.order}</p>
      <img
        className="w-24 md:w-28 h-24 md:h-28 rounded-lg cursor-grab mx-5"
        src={image?.url}
        alt="card"
      />
      <h1 className="font-semibold">{image?.title}</h1>
      <div className="absolute top-50 right-10 scale-150">
        <i
          className="fa-solid fa-pen-to-square mr-3 md:mr-5 text-indigo-500 cursor-pointer "
          onClick={(e) => handleOpenEditImage(e, image)}
        ></i>

        <input
          type="checkbox"
          checked={itemsToDelete?.includes(image._id)}
          onClick={(e) => e.stopPropagation()}
          onChange={() => toggleDeleteCheckBox(image._id)}
        />
      </div>
    </div>
  );
}

export default ImageList;
