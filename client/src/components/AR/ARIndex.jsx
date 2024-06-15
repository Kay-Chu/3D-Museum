

const ARIndex = () => {
    return (
        <>
        <h1>Save the Picture to your phone and Try with it</h1>
        <a-scene embedded arjs='sourceType: webcam; detectionMode: mono; patternRatio: 0.5;'>
            <a-marker preset="custom" type='pattern' url='./ar/marker.patt'>
                <a-box position='0 0.5 0' material='color: yellow;'></a-box>
            </a-marker>
            <a-entity camera></a-entity>
        </a-scene>
        </>
    );
};

export default ARIndex;
