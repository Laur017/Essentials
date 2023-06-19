import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Html, useProgress } from '@react-three/drei'
import W1 from './W1'
import W2 from './W2'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

const LoginModel = ({model}) => {
    return(
        <Canvas>
            <Suspense fallback={<Loader />}>
                {model === 1? 
                <W1 scale={2.5} rotation={[0.5, 0, 0]} position={[0, 0, 0]}/>
                :
                <W2 scale={2.5} rotation={[0.5, 0, 0]} position={[0, 0, 0]}/>
                }
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 2, 1]}/>
                
            </Suspense>
        </Canvas>
    )
}

export default LoginModel