import "./LoadingOverlay.css";

function LoadingOverlay() {
 return (
    // <div className="loading-overlay">
    //   <div className="loader"></div>
    //   <span className="loading-text">Carregando...</span>
    // </div>
    <div className="spinner-container">
    <div className="spinner-border" role="status"></div>
    <span>Carregando....</span>
</div>
  );
};

export default LoadingOverlay
