import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../assets/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageList from "../ImageList/ImageList";
import UploadImageModal from "../UploadImageModal/UploadImageModal";
import SingleImage from "../SingleImage/SingleImage";
import axios from "../../axiosConfig";
import Loader from "../../assets/Loader";
import EditSingleImage from "../EditSingleImage/EditSingleImage";
import { toast } from "react-toastify";
import Dialog from "../../assets/Dialog";

interface SingleImage {
  _id: string;
  order: number;
  title: string;
  imageKey: string;
  url: string;
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<SingleImage | {}>({});
  const [openSingleImage, setOpenSingleImage] = useState(false);
  const [openEditImage, setOpenEditImage] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
  const [images, setImages] = useState([]);
  const [dialog, setDialog] = useState<any>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/images");
      setImages(data.images);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(images).sort(
      (a: any, b: any) => a.order - b.order
    );

    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);

    const updatedImages: any = items.map((item: any, index) => {
      const newOrderedImage = {
        ...item,
        order: index + 1,
      };
      return newOrderedImage;
    });

    setImages(updatedImages);

    try {
      const updatedData = updatedImages.map((item: any) => ({
        _id: item._id,
        order: item.order,
      }));

      await axios.put("/images", { images: updatedData });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async () => {
    try {
      if (loading) return;

      if (itemsToDelete.length <= 0) return;

      setImages(
        [...images].filter((image: any) => !itemsToDelete.includes(image._id))
      );

      setDialog(null);

      await axios.delete(`/images`, {
        params: {
          imageIds: itemsToDelete,
        },
      });

      setItemsToDelete([]);

      toast("Delete was successful");
    } catch (error) {
      setImages(images);
      console.log(error);
    }
  };

  const cancelDelete = () => {
    setItemsToDelete([]);
  };

  const handleOpenSingleImage = (image: SingleImage) => {
    setCurrentImage(image);
    setOpenSingleImage(true);
  };

  const handleOpenEditImage = (e: any, image: SingleImage) => {
    e.stopPropagation();
    setCurrentImage(image);
    setOpenEditImage(true);
  };

  const handleCloseSingleImage = () => {
    setOpenSingleImage(false);
    setCurrentImage({});
  };

  const handleCloseEditImage = () => {
    setOpenEditImage(false);
    setCurrentImage({});
  };

  const openDeleteDialog = () => {
    setDialog({
      message: "Are you sure you want to delete selected images ?",
      onCancel: () => setDialog(null),
      onSuccess: handleDeleteImage,
    });
  };

  const handleSearch = (e: any) => {
    const searchKey = e.target.value;

    const searchResult = images.filter(
      (image: SingleImage) =>
        image.title?.toLowerCase() === searchKey.toLowerCase()
    );

    setImages(searchResult);
  };

  const sortedImages = useMemo(
    () => [...images].sort((a: any, b: any) => a.order - b.order),
    [images]
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen lg:px-80 px-10 py-28 bg-gradient-to-l from-indigo-500 to-indigo-300">
      <div>
        <div className="md:w-56 mb-10">
          <Button label={"UPLOAD"} onClick={() => setUploadImageModal(true)} />
        </div>

        <div className="flex justify-between items-center mb-5">
          <h1 className="font-extrabold text-white text-2xl">
            Images {images.length > 0 ? `(${images.length})` : "(0)"}
          </h1>

          {itemsToDelete.length > 0 && (
            <div>
              <button
                className="p-3 mr-3 text-white rounded-full font-semibold 
                bg-transparent opacity-0.5 hover:text-black hover:bg-white"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="p-3 text-white rounded-full font-semibold 
                bg-red-600 opacity-0.5 hover:bg-red-500"
                onClick={openDeleteDialog}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sortedImages.map((image: any, index: number) => (
                  <Draggable
                    key={image._id}
                    draggableId={image._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleOpenSingleImage(image)}
                      >
                        <ImageList
                          key={image._id}
                          image={image}
                          itemsToDelete={itemsToDelete}
                          setItemsToDelete={setItemsToDelete}
                          handleOpenEditImage={handleOpenEditImage}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div ref={containerRef}></div>
      </div>
      {uploadImageModal && (
        <UploadImageModal
          setUploadImageModal={setUploadImageModal}
          getImages={getImages}
          ref={containerRef}
        />
      )}
      {openSingleImage && (
        <SingleImage
          image={currentImage}
          handleCloseSingleImage={handleCloseSingleImage}
        />
      )}
      {openEditImage && (
        <EditSingleImage
          image={currentImage}
          setImages={setImages}
          handleCloseEditImage={handleCloseEditImage}
        />
      )}
      {dialog && (
        <Dialog
          message={dialog.message}
          onCancel={dialog.onCancel}
          onSuccess={dialog.onSuccess}
        />
      )}
    </div>
  );
}

export default Home;
