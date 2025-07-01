import { Suspense, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import { 
  ARButton, 
  XR, 
  Controllers,
  useHitTest,
  useXR
} from '@react-three/xr';
import { useGLTF, OrbitControls, Text } from '@react-three/drei';

function Model({ url, position }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} scale={0.5} />;
}

function ARPlacement() {
  const reticleRef = useRef();
  const [modelPosition, setModelPosition] = useState([0, 0, -0.5]);
  const [isPlaced, setIsPlaced] = useState(false);
  
  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
    
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0); // 使标记水平
  });

  const placeModel = () => {
    if (!isPlaced) {
      setModelPosition([...reticleRef.current.position]);
      setIsPlaced(true);
    }
  };

  return (
    <>
      {/* 放置标记 */}
      {!isPlaced && (
        <mesh ref={reticleRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.2, 32]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      )}
      
      {/* 模型 */}
      <Model url={modelUrl} position={modelPosition} />
      
      {/* 放置按钮 */}
      {!isPlaced && (
        <Text
          position={[0, 0, -0.5]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          点击屏幕放置模型
        </Text>
      )}
      
      {/* 控制器事件 */}
      <Controllers 
        onSelect={placeModel}
        onSqueeze={() => setIsPlaced(false)} // 重置放置状态
      />
    </>
  );
}

export default function ARViewer() {
  const router = useRouter();
  const [modelUrl, setModelUrl] = useState('');
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const { isPresenting } = useXR();

  useEffect(() => {
    // 检查WebXR支持
    if (!navigator.xr) {
      setIsSupported(false);
      setError('您的设备不支持WebXR功能');
      return;
    }

    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (!supported) {
        setIsSupported(false);
        setError('您的设备不支持AR功能');
      }
    });

    // 获取模型URL
    if (router.query.model) {
      setModelUrl(decodeURIComponent(router.query.model));
    }
  }, [router.query]);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <h2>AR功能不可用</h2>
        <p>{error}</p>
        <p>请尝试在支持AR的设备上打开此页面</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!isPresenting && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          zIndex: 100
        }}>
          <h2>AR模型查看器</h2>
          <p>扫描二维码后，点击下方按钮启动AR体验</p>
        </div>
      )}
      
      <Canvas>
        <XR>
          <Suspense fallback={null}>
            {modelUrl && (
              <>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <ARPlacement />
              </>
            )}
          </Suspense>
        </XR>
      </Canvas>
      
      {!isPresenting && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <ARButton 
            sessionInit={{ 
              requiredFeatures: ['hit-test'], 
              optionalFeatures: ['dom-overlay'],
              domOverlay: { root: document.body }
            }} 
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            启动AR体验
          </ARButton>
        </div>
      )}
    </div>
  );
}