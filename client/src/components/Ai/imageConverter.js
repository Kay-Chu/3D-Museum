// Function to remove invalid characters from Base64 data
export const removeInvalidCharacters = (base64Data) => {
  // Removes any characters that aren't valid in Base64 encoding
  return base64Data.replace(/[^A-Za-z0-9+/=]+/g, ""); // Keep only valid Base64 characters
};

// Function to ensure correct Data URI prefix
export const addPrefixIfMissing = (base64Data) => {
  const expectedPrefix = "data:image/png;base64,"; // Expected prefix
  
  if (!base64Data) {
    console.log("base64Data is "+base64Data)
    // throw new Error("Base64 data is undefined."); // Check if data is defined
  }

  // Add prefix if it's missing
  if (!base64Data.startsWith(expectedPrefix)) {
    return `${expectedPrefix}${base64Data.trim()}`; // Trim and add prefix
  }
  
  return base64Data.trim(); // Otherwise, return trimmed data
};

// Function to validate Base64 data
export const validateBase64 = (base64Data) => {
  const base64Regex = /^[A-Za-z0-9+/=]+$/;

  if (!base64Data) {
    console.log("base64Data is "+base64Data)
    // throw new Error("Base64 data is undefined."); // Check if data is defined
  }

  return base64Regex.test(base64Data.split(",")[1]); // Validate only the Base64 content
};

// Function to convert Base64 to Blob and return a URL
export const imageConverter = (base64Data) => {

  console.log("Start converting.")

  if (!base64Data) {
    console.log("base64Data is "+base64Data)
    throw new Error("Base64 data is undefined."); // Check if data is defined
  }

  const base64WithPrefix = addPrefixIfMissing(base64Data); // Add prefix if needed
  const cleanedBase64 = removeInvalidCharacters(base64WithPrefix); // Remove invalid characters
  
  const base64String = cleanedBase64.split(",")[1]; // Get Base64 data without prefix
  
  if (!validateBase64(base64String)) {
    throw new Error("Base64 data contains invalid characters."); // Validate Base64 data
  }

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
