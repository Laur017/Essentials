import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { useSpring, animated, config} from '@react-spring/web'
import { Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Loader = () => {
    const { progress } = useProgress()
    return <Html center >{progress}%</Html>
}

const Model = () => {
    const {camera} = useThree()
    const book = useLoader(GLTFLoader, '/models/book/scene.gltf')
    const bookModel = useRef()


    useFrame (({clock}) => {
        bookModel.current.rotation.y = Math.sin(clock.getElapsedTime())
    })

    camera.position.set(0,1.5,5)
    camera.rotation.x = -0.1
    camera.rotation.z = -1.6
    return <primitive ref={bookModel} object={book.scene} scale={0.25} />
}

const LoginModel = () => {
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

export default LoginModel