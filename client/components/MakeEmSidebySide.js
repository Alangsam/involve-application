import React from "react";

export default function MakeEmSidebySide(props) {
    const whichSide = () => {
        if (props.side === "right") {
            return "float-right";
        } else return "";
    };

    return (
        <div className={`col-lg-5 d-inline-block ${whichSide(props)}`}>
            {props.children}
        </div>
    );
}
