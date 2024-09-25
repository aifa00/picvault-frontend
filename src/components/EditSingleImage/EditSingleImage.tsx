import { useEffect, useRef, useState } from "react";
import Button from "../../assets/Button";
import axios from "../../axiosConfig";
import Loader from "../../assets/Loader";
import { toast } from "react-toastify";

interface SingleImageProps {
  image: any;
  setImages: any;
  handleCloseEditImage: () => void;
}

function EditSingleImage({
  image,
  setImages,
  handleCloseEditImage,
}: SingleImageProps) {
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [error, setError] = useState("");
  const inputRef: any = useRef("");

  useEffect(() => {
    inputRef?.current?.focus();
    inputRef.current.value = image?.title;
  }, []);

  const handleFileChange = (e: any) => {
    const image = e.target.files[0];

    if (!image) return;

    setNewImage(image);
  };

  const handleSubmit = async () => {
    try {
      if (loading) return;

      const title = inputRef.current.value;

      if (!title) {
        inputRef.current.focus();
        return setError("Please enter a title");
      } else {
        setError("");
      }

      // Close modal when no updates
      if (!newImage && image.title === title) return handleCloseEditImage();

      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);

      if (newImage) formData.append("images", newImage);

      const { data } = await axios.patch(`/images/${image._id}`, formData);

      const newImageUrl = data.newImageUrl;

      setImages((prevImages: any) =>
        [...prevImages].map((obj: any) => {
          if (obj._id === image._id) {
            return { ...obj, title, url: newImageUrl ? newImageUrl : obj.url };
          } else {
            return obj;
          }
        })
      );

      toast("Edit was successful");

      handleCloseEditImage();
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center p-3 bg-black/50 z-50">
      <div className="relative mt-10">
        {!loading && (
          <div className="text-right">
            <i
              className="fa-solid fa-xmark fa-2x cursor-pointer text-white/50"
              onClick={handleCloseEditImage}
            ></i>
          </div>
        )}

        <div className="flex flex-col items-center px-11">
          <div className="relative">
            {loading && <Loader />}
            <div className="relative">
              <label
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2
            -translate-y-1/2 hover:bg-gray-300 hover:opacity-40 rounded-full cursor-pointer"
              >
                <img
                  src="https://www.chilukwa-joinery.com/img/placeholder.png"
                  alt="camera"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <img
                className="w-[25rem] h-[25rem]"
                src={newImage ? URL.createObjectURL(newImage) : image?.url}
                alt={image?.title}
              />
            </div>

            <input
              type="text"
              placeholder="Enter title"
              ref={inputRef}
              className="w-full p-3 text-xl outline-0"
            />
          </div>

          {error && (
            <span className="text-white bg-red-500/70 mt-3 p-3 w-full">
              {error}
            </span>
          )}

          <Button label={"SAVE"} onClick={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default EditSingleImage;
