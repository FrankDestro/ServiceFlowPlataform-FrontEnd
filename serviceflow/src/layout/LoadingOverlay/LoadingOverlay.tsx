import "./LoadingOverlay.css";

function LoadingOverlay() {
 return (
    <div className="loading-overlay">
      <div className="loader"></div>
      <span className="loading-text">Carregando...</span>
    </div>
  );
};

export default LoadingOverlay
