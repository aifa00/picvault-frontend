import { forwardRef, useState } from "react";
import Button from "../../assets/Button";
import InputGroup from "../InputGroup/InputGroup";
import axios from "../../axiosConfig";
import Loader from "../../assets/Loader";

function UploadImageModal({ setUploadImageModal, getImages }: any, ref: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [commonError, setCommonError] = useState<string>("");
  const handleFilesChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file: file,
      title: "",
      error: "",
    }));
    setImages([...images, ...selectedFiles]);
  };

  const handleTitleChange = (index: number, title: string) => {
    const duplicateTitleExist = images.some(
      (image: any, i: number) =>
        image.title.toLowerCase() === title.toLowerCase() &&
        index !== i &&
        title !== ""
    );

    let imagesWithError;

    if (duplicateTitleExist) {
      imagesWithError = images.map((image: any, currIndex: number) => {
        if (index === currIndex) {
          return { ...image, error: "Duplicate title" };
        } else {
          return { ...image, error: "" };
        }
      });

      setImages(imagesWithError);
    } else {
      imagesWithError = images.map((image: any) => {
        return { ...image, error: "" };
      });
    }

    const updatedFiles = imagesWithError.map((fileObj: any, i: number) =>
      i === index ? { ...fileObj, title } : fileObj
    );

    setImages(updatedFiles);
  };

  const handleSubmit = async () => {
    if (images.length <= 0)
      return setCommonError("Please choose images to upload");

    if (commonError) setCommonError("");

    let hasError = false;

    const imagesError = images.map((image: any) => {
      if (!image.title || image.error) {
        hasError = true;

        return {
          ...image,
          error: `${image.error ? image.error : "This field is required"}`,
        };
      } else {
        hasError = false;

        return { ...image, error: "" };
      }
    });

    if (hasError) {
      return setImages(imagesError);
    }

    const formData = new FormData();

    images.forEach((fileObj: any, index: any) => {
      formData.append("images", fileObj.file);
      formData.append(`titles[${index}]`, fileObj.title);
    });

    try {
      if (loading) return;

      setLoading(true);

      await axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      closeModal();

      getImages();

      ref.current.scrollIntoView({ behavior: "smooth" });
    } catch (error: any) {
      const status = error.response ? error.response.status : null;
      const errorMessage: string = error.response.data.message;

      if (status === 400 || status === 409) {
        setCommonError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const filteredArr = images.filter((image: any, i: number) => i !== index);
    setImages(filteredArr);
  };

  const closeModal = () => {
    setUploadImageModal(false);
  };

  return (
    <div
      className="fixed flex items-center 
      justify-center p-3 top-0 left-0 right-0 bottom-0 bg-black/10 z-50"
    >
      <div className="relative md:w-[50rem] bg-white p-10 pt-0 shadow-inner rounded-lg">
        {loading && <Loader />}

        <div className="text-right py-5">
          <i
            className="fa-solid fa-xmark fa-2x cursor-pointer text-black/50"
            onClick={closeModal}
          ></i>
        </div>

        <div className="flex flex-wrap max-h-80 overflow-y-scroll mb-10">
          {images.map((image: any, index: number) => (
            <div key={index} className="w-44 h-56 mb-1 mr-5 md:mr-14 relative">
              <i
                className="fa-solid fa-xmark fa-2x absolute top-1 right-1 cursor-pointer text-slate-300"
                onClick={() => handleRemoveImage(index)}
              ></i>
              <img
                src={URL.createObjectURL(image.file)}
                alt="uploads"
                className="w-full h-40 md:h-34 rounded mb-1"
              />
              <InputGroup
                type={"text"}
                placeholder={"Title"}
                value={image.title}
                onChange={(e: any) => handleTitleChange(index, e.target.value)}
                error={image?.error}
              />
            </div>
          ))}
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
        />

        {commonError && (
          <span className="block text-red-500 bg-red-100 mt-3 p-5">
            {commonError}
          </span>
        )}

        <div className="flex">
          <div className="flex-1 mx-1">
            <Button label={"Cancel"} onClick={closeModal} />
          </div>
          <div className="flex-1 mx-1 text-center">
            <Button label={"Upload"} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(UploadImageModal);
