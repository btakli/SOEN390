import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { togglePriority } from '../../redux/actions/patientActions';

import "./PriorityToggle.css";

function PriorityToggle(props){

  const { value, id } = props;

  const handleClick = () => {
    props.togglePriority(id);
  };

  return (
    <div className="toggle-container" onClick={handleClick}> 
      <div className={`dialog-button ${value ? "" : "disabled"}`}>
        {value ? "YES" : "NO"} 
      </div>
    </div>
  );
}

PriorityToggle.propTypes = {
  togglePriority: PropTypes.func.isRequired
};

export default connect(null, { togglePriority })(PriorityToggle);