import { useRef, useState } from "react";
import UploadItem from "../UploadItem/UploadItem.jsx";

export default function FileUpload({
  id,
  label = "Upload files",
  info = "Supported formats: jpg, png, pdf. Maximum size: 100 MB",
  multiple = false,
  imagePreview = false,
  maxSizeMB = 100,
  accept,
  onChange,
  className = "",
}) {
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);

  const handleFiles = (fileList) => {
    const selectedFiles = Array.from(fileList);

    const mapped = selectedFiles.map((file) => {
      const isTooLarge = file.size > maxSizeMB * 1024 * 1024;
      const isImage = file.type.startsWith("image/");

      return {
        file,
        status: isTooLarge ? "error" : "uploaded",
        errorMessage: isTooLarge ? `File exceeds size limit, max size is ${maxSizeMB} MB` : "",
        previewUrl: imagePreview && isImage ? URL.createObjectURL(file) : null,
      };
    });

    setItems(multiple ? mapped : mapped.slice(0, 1));
    onChange?.(multiple ? selectedFiles : selectedFiles[0]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className={`upload-block ${multiple ? "upload-block--multiple" : "upload-block--single"} ${imagePreview ? "upload-block--image-preview" : ""} ${className}`}>
      <label htmlFor={id} className="upload-block__label">{label}</label>
      <p id={`${id}-info`} className="upload-block__info">{info}</p>

      <div className="upload-block__control">
        <input
          ref={inputRef}
          type="file"
          id={id}
          className="upload-block__input"
          multiple={multiple}
          accept={accept}
          aria-describedby={`${id}-info ${id}-list`}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <label htmlFor={id} className="mud-btn mud-btn-primary mud-btn-md upload-block__button">
          {multiple ? "Choose files" : "Choose file"}
        </label>

        <div id={`${id}-list`} className="upload-block__list upload" role="status" aria-live="polite">
          {items.map((item, index) => (
            <UploadItem
              key={`${item.file.name}-${index}`}
              {...item}
              onRemove={() => removeItem(index)}
            />
          ))}
        </div>
      </div>

      {imagePreview && (
        <p className="upload-block__description">
          Uploaded images show a live preview/thumbnail for quick recognition.
        </p>
      )}
    </div>
  );
}