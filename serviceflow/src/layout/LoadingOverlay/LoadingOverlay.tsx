import "./LoadingOverlay.css";

function LoadingOverlay() {
 return (
    <div className="spinner-container">
    <div className="spinner-border" role="status"></div>
    <span>Carregando....</span>
</div>
  );
};

export default LoadingOverlay
