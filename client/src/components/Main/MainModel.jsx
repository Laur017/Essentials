import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import { useSpring, a } from "@react-spring/three";
import { Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

extend({ OrbitControls })

function Controls() {
  const controls = useRef()
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
}

const MainModel = (props) => {

    const Model = () => {
        const { camera } = useThree()
        const { scene } = useLoader(GLTFLoader, "/models/room/room.gltf")
      
        camera.rotation.set(0, 0.5, 0)
      
        const position = useSpring({
          position:
            props.subject === 0
              ? [-3, -2.5, 1]
              : props.subject === 1
              ? [-3, -2, 1]
              : props.subject === 2
              ? [-3, -1, 1]
              : props.subject === 3
              ? [-3, 0.5, 1]
              : [-3, 1, 1],
          config: {
            mass: 1,
            tension: 500,
            friction: 80,
            precision: 0.0001,
          },
        })
      
        return (
          <a.primitive object={scene} scale={1} position={position.position} config={{
            mass: 1,
            tension: 500,
            friction: 80,
            precision: 0.0001,
          }}>
            <meshStandardMaterial attach="material" />
          </a.primitive>
        )
      }
  
    return(
        <Canvas>
            <Suspense fallback={<Loader />}>
                <Model />
                <ambientLight intensity={0.5} />
                <directionalLight />
                {/* <Controls /> */}
            </Suspense>
        </Canvas>
    )
}

export default MainModel