import React from "react";

import CustomButton from "./CustomButton";

const AIPicker = (props) => {
  // console.log(typeof props.handleSubmit);
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Type to create your image:)"
        rows={5}
        value={props.prompt}
        onChange={(e) => props.setPrompt(e.target.value)}
        className="aipicker-textarea"
      />

      <div className="flex flex-wrap gap-3">
        {props.generatingImg ? (
          <CustomButton
            type="outline"
            title="Generating Your Image..."
            customStyles={"text-us"}
          />
        ) : (
          <>

            {/* <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => props.handleSubmit("logo")}
              customStyles="text-xs"
            /> */}

            <CustomButton
              type="filled"
              title="DIY Texture"
              handleClick={() => props.handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
