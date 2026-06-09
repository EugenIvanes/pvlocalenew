import Icon from "../Icon/Icon.jsx";

function formatSize(size) {
  if (!size) return "0 MB";
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export default function UploadItem({
  file,
  name,
  size,
  status = "uploaded", // uploading | success | uploaded | error
  errorMessage,
  previewUrl,
  onRemove,
}) {
  const fileName = file?.name || name;
  const fileSize = file?.size || size;

  return (
    <div className={`upload__item ${status === "error" ? "upload__item--error" : ""}`}>
      <div className="upload__item__main">
        {previewUrl ? (
          <div className="upload__thumb">
            <img src={previewUrl} alt="" aria-hidden="true" />
          </div>
        ) : status !== "error" ? (
          <div className="upload__thumb">
            <img src="/assets/icons/upload-icon.svg" alt="" aria-hidden="true" />
          </div>
        ) : null}

        <div className="upload__info">
          <span className="upload__file-name">{fileName}</span>
          <span className="mud-mx-4"> • </span>
          <span className="upload__file-size">{formatSize(fileSize)}</span>
        </div>

        {status === "success" ? (
          <span className="mud-text-green-700 mud-inline-flex">
            <Icon name="circle-checkmark-filled" size="md" />
          </span>
        ) : status === "error" ? (
          <span className="mud-text-red-700 mud-inline-flex">
            <Icon name="circle-info-filled" size="md" />
          </span>
        ) : (
          <button
            type="button"
            className={status === "uploading" ? "upload__upload" : "upload__remove"}
            aria-label={`Remove ${fileName}`}
            onClick={onRemove}
          >
            <Icon name="cross-small" size="md" />
          </button>
        )}
      </div>

      {status === "error" && errorMessage && (
        <div className="upload__item__error-section">
          <span className="upload__item__error-message">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}