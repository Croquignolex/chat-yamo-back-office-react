import React from "react";
import {PopoverBody, UncontrolledPopover} from "reactstrap";

const FormatStringWithPopHover = ({text}) => {
  try {
    if(text && text.length > 30) {
      return (
          <>
            {text.substring(0, 30)}
            <span id="descriptionHover" className="hand-cusor"> ...</span>
            <UncontrolledPopover placement="bottom" target="descriptionHover" trigger="hover">
              <PopoverBody>{text}</PopoverBody>
            </UncontrolledPopover>
          </>
      )
    }
  } catch (e) { console.log(e); }
  return <>{text}</>;
};

export default FormatStringWithPopHover
