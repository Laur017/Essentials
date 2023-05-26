import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import { useSpring, a } from "@react-spring/three";
import { Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

const LearnModel = (props) => {

    const Model = () => {
        const { camera } = useThree();
        const { scene } = useLoader(GLTFLoader, "/models/monitor/scene.gltf");
        const [hovered, setHovered] = useState(false);
        const springConfig = { mass: 1, tension: 100, friction: 15, precision: 0.0001 };
      
        const { scale } = useSpring({
          scale: hovered ? [2.5 * 2, 2.5 * 2, 2.5 * 2] : [2.5, 2.5, 2.5],
          config: springConfig
        });

        const position = hovered ? [0, -7, 0] : [0, -2.5, 0]

        const style= {
            width: hovered? '150em' : '120em',
            height: hovered? '80em' : '58em',
        }
        return (
          <a.primitive 
          object={scene} 
          position={[0, -2.5, 0]} 
          scale={2.5} 
        >
            <Html wrapperClass='monitor' transform position={[0.05, 1.8, -1.5]} distanceFactor={1.15}>
              <iframe src='https://lp-portofolio.000webhostapp.com/' loading='lazy'></iframe>
            </Html>
          </a.primitive>
        )
      }
  
    return(
        <Canvas>
            <Suspense fallback={<Loader />}>
                <Model />
                <ambientLight intensity={0.5} />
                <directionalLight />
            </Suspense>
        </Canvas>
    )
}

export default LearnModel