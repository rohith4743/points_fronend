import { toast, ToastContainer } from "react-toastify";

const Point = ({point, onDelete}) => {

    const showSuccessToast = () => {
      toast.success("Copy Successful!", {
        position: "top-right",
        autoClose: 3000,
      });
    };

    const handleCopy = () => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = point.content; 

      document.body.appendChild(tempDiv);
      
      const range = document.createRange();
      range.selectNodeContents(tempDiv);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      document.execCommand("copy");
      document.body.removeChild(tempDiv);
      showSuccessToast();
      
  };

    return (
        <div class="point card m-3">
            
            <div class="card-body d-flex flex-column flex-md-row">
                <div className="flex-grow-1 p-3">
                    <h5 class="card-title" dangerouslySetInnerHTML={{ __html: point.content }}></h5>
                    <p class="card-text">{point.keywords.join(", ")}</p>
                </div>
                <div className="p-3">
                    <button className="btn btn-outline-success me-3" onClick={handleCopy} > Copy </button>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(point.id)} > Delete </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}
const PointList = ({ points, onDelete }) => {
    return (
      <div className="point-list">
        {points.map((point) => (
          <div key={point.id} className="point-card">
            

            <Point point={point} onDelete={onDelete} />
          </div>
        ))}
      </div>
    );
  };

  export default PointList;