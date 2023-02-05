const faIconList = {
  facebook: "fa-facebook-f",
  google: "fa-google",
};

const CircleButton = ({ onClick, icon }) => (
  <button
    type="button"
    className="btn  btn-floating mx-1 circle-link"
    onClick={onClick}
  >
    <i className={`fa ${faIconList[icon]}`}></i>
  </button>
);

export default CircleButton;
