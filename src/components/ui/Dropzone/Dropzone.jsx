import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import UploadItem from "../UploadItem/UploadItem.jsx";

export default function Dropzone({
  id,
  multiple = true,
  disabled = false,
  maxSizeMB = 100,
  accept,
  onChange,
}) {
  const inputRef = useRef(null);
  const [active, setActive] = useState(false);
  const [items, setItems] = useState([]);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList);

    const mapped = files.map((file) => ({
      file,
      status: file.size > maxSizeMB * 1024 * 1024 ? "error" : "uploaded",
      errorMessage:
        file.size > maxSizeMB * 1024 * 1024
          ? `File exceeds size limit, max size is ${maxSizeMB} MB`
          : "",
    }));

    setItems(multiple ? mapped : mapped.slice(0, 1));
    onChange?.(multiple ? files : files[0]);
  };

  return (
    <div className="upload-block">
      <div
        className={`dropzone ${active ? "dropzone--active" : ""}`}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setActive(true);
        }}
        onDragLeave={() => setActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setActive(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="dropzone__content">
          <span className="mud-p-12 mud-bg-gray-200 mud-radius-full mud-inline-flex">
            <Icon name="cloud-upload" size="lg" />
          </span>
          <p>
            Drag and drop or{" "}
            <span className="dropzone__link">
              {multiple ? "choose files" : "choose file"}
            </span>
          </p>
        </div>

        <span className="dropzone__content--active">
          Drop files to upload
        </span>

        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple={multiple}
          accept={accept}
          hidden
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="dropzone__details upload-block__info">
        <p>Supported formats: jpg, png, pdf.</p>
        <p>Maximum size: {maxSizeMB} MB</p>
      </div>

      <div className="upload-block__list upload">
        {items.map((item, index) => (
          <UploadItem
            key={`${item.file.name}-${index}`}
            {...item}
            onRemove={() =>
              setItems((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </div>
  );
}