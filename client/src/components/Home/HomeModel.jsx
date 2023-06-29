import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber"
import { Html, useProgress, OrbitControls } from '@react-three/drei'
import Room from './Room'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

export default function HomeModel() {
    
  return (
    <Canvas >
    {/* <OrbitControls /> */}
    <Suspense fallback={<Loader />}>
      <Room scale={0.7} position={[0, -2, -4]} rotation={[0.5, 2.3, 0]}/>
      <ambientLight intensity={0.5} />
      <directionalLight />
    </Suspense>
  </Canvas>
  )
}
