import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import { useSpring, a } from "@react-spring/three";
import { Html, useProgress, OrbitControls } from '@react-three/drei'
import Consola from './Consola1'
import Coffee from './Coffee'
import Dice from './Dice2'
import DatabaseModel from './Dbloop'
import MathModel from './Pencil2'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

const MainModel = (props) => {

  let initialModel;
  if (props.subject === "Math") {
    initialModel = <MathModel scale={0.6} rotation={[0.5, 0, 0]} position={[-1.9, 0, 0]} />;
  } else if (props.subject === "Probabilistics") {
    initialModel = <Dice scale={0.7} position={[0, -3, 0]} rotation={[0, 1, 0]} />;
  } else if (props.subject === "Databases") {
    initialModel = <DatabaseModel scale={1.2} position={[-0.7, -2, 0]} rotation={[0, 1.5, 0]} />;
  } else if (props.subject === "Java") {
    initialModel = <Coffee scale={1.1} rotation={[0.5, 0, 0]} position={[0, -1.5, 0]} />;
  } else if (props.subject === "Python") {
    initialModel = <Dice scale={0.7} position={[0, -3, 0]} rotation={[0, 1, 0]} />;
  } else {
    initialModel = <Consola scale={0.5} rotation={[1.6, -1.6, 0]} />;
  }

  return (
    <Canvas>
      <OrbitControls />
      <Suspense fallback={<Loader />}>
        {initialModel}
        <ambientLight intensity={0.5} />
        <directionalLight />
      </Suspense>
    </Canvas>
  );
};

export default MainModel;
