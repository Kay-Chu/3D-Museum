import { GLTFExporter } from 'three-stdlib';
import * as THREE from 'three';

 const exportAndUploadGLB = (mesh, modelName = 'custoModel', onSuccess) => {
  const exporter = new GLTFExporter();

  const scene = new THREE.Scene();
  const cloned = mesh.clone(true); 
  scene.add(cloned);


  exporter.parse(
    scene,
    (result) => {
      if (!(result instanceof ArrayBuffer)) {
        console.error("❌ Exported result is not ArrayBuffer, probably exported as JSON not binary");
        return;
      }

      const blob = new Blob([result], { type: 'model/gltf-binary' });
      const file = new File([blob], `${modelName}.glb`, { type: 'model/gltf-binary' });
      const formData = new FormData();
      formData.append('model', file);

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/upload`;


      fetch(apiUrl, {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          console.log(' Upload Successfully:', data.url);
          onSuccess?.(data.url);  
        })
        .catch(err => {
          console.error(' Upload Failed:', err);
        });
    },
    (error) => {
      console.error('❌ GLTF export failed:', error);
    },
    { binary: true }
  );
};

export default exportAndUploadGLB;