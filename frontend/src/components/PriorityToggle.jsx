import PropTypes from "prop-types";
import { Component } from "react";
import { useState, useEffect} from "react"; 

import "./src/PriorityToggle.css";

export class PriorityToggle extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        
    };
  }


  render() {
    const { selected, toggleSelected } = this.props;
 

    return (

      <div className="toggle-container" onClick={toggleSelected}> 
        <div className={`dialog-button ${selected ? "" : "disabled"}`}>
          {selected ? "YES" : "NO"} 
        </div>
      </div>
    );
  }

}


PriorityToggle.propTypes = {
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired
};


function Toggle () {
    const [selected, setSelected] = useState(false);

    useEffect ( () => {
        window.localStorage.setItem('testTooSeeIfFlagIsSaved', JSON.stringify(selected));
    });

    useEffect ( () => {
       const selected =  window.localStorage.getItem('testTooSeeIfFlagIsSaved'); 
    });

    return (
    <div >
        <PriorityToggle
        selected={selected}
        toggleSelected={() => {
            setSelected(!selected)
        }} 
        />
    </div>
    );
}


export default Toggle;