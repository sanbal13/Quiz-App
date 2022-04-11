function ProgressBar(props) {
  return (
    <div className="progress-bar">
      <div className="progress" style={{width: `${props.width}%`}}></div>
    </div>
  );
}
export default ProgressBar;
