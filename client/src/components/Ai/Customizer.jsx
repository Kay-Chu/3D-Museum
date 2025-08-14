import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../../config/config";
import state from "./store/index";
// import {download} from 'img';
import { downloadCanvasToImage, reader } from "../../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../../config/constants";
import { fadeAnimation, slideAnimation } from "../../config/motion";

import AIPicker from "./AIPicker";
import ColorPicker from "./ColorPicker";
import FilePicker from "./FilePicker";
import Tab from "./Tab";

// import { imageConverter } from "./imageConverter";


import styled from "styled-components";
const Image = styled.image`
height: 20%;
width: 20%;
position: fixed;
right: 1rem;
top: 10rem;
`;

const Customizer = ({ selectedStyle }) => {

  console.log("Current style:", selectedStyle);


  const snap = useSnapshot(state);

  // File
  const [file, setFile] = useState("");

  // AI
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");


  const generateTabContent = () => {

    switch (activeEditorTab) {
      case "colorpicker":
        console.log("111")
        return <ColorPicker />
      case "filepicker":
        return <FilePicker />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
        break;
      default:
        return null;
    }


  };

  const handleSubmit = async (imageStyle) => {

    let finalPrompt = prompt;
    console.log(imageStyle);
    switch (selectedStyle) {
      case "ink":
        finalPrompt += ", Based on this, integrate ancient Chinese culture, and process this image with Traditional Chinese ink painting style.";
        break;
      case "porcelain":
        finalPrompt += ", Based on this, integrate ancient Chinese culture, and process this image with Traditional Chinese blue and white porcelain pattern style.";
        break;
      case "mural":
        finalPrompt += ", Based on this, integrate ancient Chinese culture, and process this image with Traditional Chinese mural art style.";
        break;
      default:
        finalPrompt += ", Based on this, integrate ancient Chinese culture, and process this image with Traditional Chinese ink painting style.";
    }


    try {
      setGeneratingImg(true);

      // const localUrl = "http://localhost:8081/api/v1/dalle";
      const webUrl = "https://museum.k-chu.com/api/v1/dalle";

      const response = await fetch(webUrl, {
        // const response = await fetch(localUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          max_tokens: 5,
          size: "256x256",
          style: "vivid",
        }),
      });

      const data = await response.json();

      const imageUrl = imageConverter(data.photo); // Get Blob URL
      console.log("Generated Image URL:", imageUrl);

      setImageUrl(imageUrl); // Update state with new image URL

      if (imageStyle === 'logo') {
        state.isLogoTexture = true;
        // state.isFullTexture = false;
        state.logoDecal = imageUrl;
      } else {
        // state.isLogoTexture = false;  
        state.isFullTexture = true;
        state.fullDecal = imageUrl;
      }



    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      // setActiveEditorTab("");
    }
  };

  const removeInvalidCharacters = (base64Data) => {
    return base64Data.replace(/[^A-Za-z0-9+/=]+/g, "");
  };

  const imageConverter = (base64Data) => {
    const cleanedBase64 =
      "data:image/png;base64," + removeInvalidCharacters(base64Data);
    const base64String = cleanedBase64.split(",")[1]; // Get Base64 data without prefix

    const byteCharacters = atob(base64String); // Decode Base64
    const byteArrays = [];

    // Convert Base64 to byte arrays
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice).map((c) => c.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: "image/png" }); // Create Blob from byte arrays
    return URL.createObjectURL(blob); // Return Blob URL
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    // if(!activeFilterTab[decalType.filterTab]) {
    //   handleActiveFilterTab(decalType.filterTab)
    // }
  };

  return (
    <>
      <AnimatePresence>
        {
          // snap.intro &&
          <>
            {/* <div><p>  {selectedStyle.toUpperCase()}</p></div> */}
            <motion.div
              key="custom"
              // className="absolute top-0 left-0 z-999 mb-20"
              {...slideAnimation("left")}
            >
              <div className="flex items-center min-h-screen z-999">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Tab key={tab.name} tab={tab}  isActiveTab={activeEditorTab === tab.name} handleClick={() => setActiveEditorTab(tab.name)}/>
                  ))}
                  {generateTabContent()}
                </div>
              </div>
            </motion.div>

            <Image alt="Generated Image">
              {imageUrl && <img src={imageUrl} alt="Generated from base64" className="generatedImage" />}
            </Image>

          </>
        }
      </AnimatePresence>
    </>
  );
};

export default Customizer;
