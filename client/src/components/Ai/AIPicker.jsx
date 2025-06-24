import React from "react";

import CustomButton from "./CustomButton";

const AIPicker = (props) => {
  console.log("aipicker");
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Type to create your image:)"
        rows={5}
        value={props.prompt}
        onChange={(e) => props.setPrompt(e.target.value)}
        className="aipicker-textarea"
      />

      <div className="flex">
        {props.generatingImg ? (
          <CustomButton
            type="outline"
            title="Drying and Firing..."
            customStyles={"text-us"}
          />
        ) : (
          <>

            <CustomButton
              type="filled"
              title="Custom Logo"
              handleClick={() => props.handleSubmit("logo")}
              customStyles="text-xs"
            />

            {/* <CustomButton
              type="filled"
              title="Full"
              handleClick={() => props.handleSubmit("full")}
              customStyles="text-xs"
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
