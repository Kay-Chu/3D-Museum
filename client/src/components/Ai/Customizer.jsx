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
height: 70px;
width: 70px;
position: fixed;
right: 1rem;
top: 10rem;
`;

const Customizer = () => {
  const snap = useSnapshot(state);

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");

  const generateTabContent = () => {
    return (
      <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
      />
    );
  };

  const handleSubmit = async (type) => {
    console.log("handleSubmit called with type:", type);

    if (!prompt) return alert("Pleae enter a prompt");

    try {
      setGeneratingImg(true);
      const response = await fetch("http://museum.k-chu.com/api/v1/dalle", {
      //const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      const imageUrl = imageConverter(data.photo); // Get Blob URL
      console.log("Generated Image URL:", imageUrl);

      setImageUrl(imageUrl); // Update state with new image URL

      state.isFullTexture = true;
      
      state.fullDecal = imageUrl;
      
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
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
            <motion.div
              key="custom"
              className="absolute top-0 left-0 z-999"
              {...slideAnimation("left")}
            >
              <div className="flex items-center min-h-screen z-999">
                <div className="editortabs-container tabs">
                  {EditorTabs.map((tab) => (
                    <Tab key={tab.name} tab={tab} />
                  ))}
                  {generateTabContent()}
                </div>
              </div>
            </motion.div>
            <Image alt="Generated Image">
              {imageUrl && <img src={imageUrl} alt="Generated from base64" />}
            </Image>
          </>
        }
      </AnimatePresence>
    </>
  );
};

export default Customizer;
