function VideoModal({ videoUrl, onClose }) {
  if (!videoUrl) return null;

  return (
    <div
      className="modal"
      style={{ display: "flex" }}
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal-sadrzaj">
        <button id="modal-zatvori" onClick={onClose}>
          ✕
        </button>
        <iframe
          id="modal-video"
          src={videoUrl}
          allowFullScreen
          title="Video vježbe"
        />
      </div>
    </div>
  );
}

export default VideoModal;
