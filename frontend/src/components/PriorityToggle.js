import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { togglePriority } from '../redux/actions/patientActions';
import { toggleImmigrantPriority } from '../redux/actions/immigrantActions';

import "../styles/PriorityToggleStyles.css";

function PriorityToggle(props){

  const { value, id, is_immigrant } = props;

  const handleClick = () => {
    if (is_immigrant)
      props.toggleImmigrantPriority(id);
    else
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
  togglePriority: PropTypes.func.isRequired,
  toggleImmigrantPriority: PropTypes.func.isRequired
};

export default connect(null, { togglePriority, toggleImmigrantPriority })(PriorityToggle);