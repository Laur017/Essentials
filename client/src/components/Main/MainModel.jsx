import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import { useSpring, a } from "@react-spring/three";
import { Html, useProgress, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import Consola from './Consola1'
import Coffee from './Coffee'
import Dice from './Dice2'
import DatabaseModel from './Dbloop'
import MathModel from './Pencil2'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

extend({ OrbitControls })

// function Controls() {
//   const controls = useRef()
//   const { camera, gl } = useThree()
//   useFrame(() => controls.current.update())
//   return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
// }

const MainModel = (props) => {

    // const Model = () => {
    //     const { camera } = useThree()
    //     const { scene } = useLoader(GLTFLoader, "/models/room/room.gltf")
      
    //     camera.rotation.set(0, 0.5, 0)
      
    //     const position = useSpring({
    //       position:
    //         props.subject === 0
    //           ? [-3, -2.5, 1]
    //           : props.subject === 1
    //           ? [-3, -2, 1]
    //           : props.subject === 2
    //           ? [-3, -1, 1]
    //           : props.subject === 3
    //           ? [-3, 0.5, 1]
    //           : [-3, 1, 1],
    //       config: {
    //         mass: 1,
    //         tension: 500,
    //         friction: 80,
    //         precision: 0.0001,
    //       },
    //     })
      
    //     return (
    //       <a.primitive object={scene} scale={1} position={position.position} config={{
    //         mass: 1,
    //         tension: 500,
    //         friction: 80,
    //         precision: 0.0001,
    //       }}>
    //         <meshStandardMaterial attach="material" />
    //       </a.primitive>
    //     )
    //   }
    console.log(props.subject)
    return(
        <Canvas>
          <OrbitControls />
            <Suspense fallback={<Loader />}>
                {
                  props.subject === "Math"
                            ? <MathModel scale={0.6} rotation={[0.5, 0, 0]} position={[-1.9,0,0]}/>
                            : props.subject === "Probabilistics"
                            ? <Dice scale={0.7} position={[0,-3,0]} rotation={[0, 1, 0]}/>
                            : props.subject === "Databases"
                            ? <DatabaseModel scale={1.2} position={[-0.7,-2,0]} rotation={[0, 1.5, 0]}/>
                            : props.subject === "Java"
                            ? <Coffee scale={1.1} rotation={[0.5, 0, 0]} position={[0,-1.5,0]}/>
                            : props.subject === "Python"
                            ? <Dice scale={0.7} position={[0,-3,0]} rotation={[0, 1, 0]}/>
                            :<Consola scale={0.5} rotation={[1.6,-1.6, 0]}/>
                }
                <ambientLight intensity={0.5} />
                <directionalLight />
                {/* <Controls /> */}
            </Suspense>
        </Canvas>
    )
}

export default MainModel