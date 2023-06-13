import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { useSpring, animated, config} from '@react-spring/web'
import { Html, OrbitControls, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Snake from './Snake'



const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

const Model = () => {
    const {camera} = useThree()
    const room = useLoader(GLTFLoader, './models/room2/room.gltf')
    const homeRoom = useRef()


    useFrame (({mouse,viewport}) => {
        const x = (mouse.x * viewport.width) / 100
        // const y = (mouse.y * viewport.height) / 100
        homeRoom.current.lookAt(x-0.2,-0.1,1)
    })

    camera.position.set(0,1,5)

    return <primitive ref={homeRoom} object={room.scene} scale={3} />
}

const Home = () => {
    
    return(
        <Canvas style={{ background: "lightyellow" }} >
            <OrbitControls />
            <Suspense fallback={<Loader />}>
                <Snake position={[-900,0,-1100]} scale={6}/>
                <ambientLight intensity={1} />
                <directionalLight />
                
                
            </Suspense>
        </Canvas>
    )

}

export default Home