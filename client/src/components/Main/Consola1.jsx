/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/consola1.glb
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/consola1.glb')
  const { actions,names } = useAnimations(animations, group)

  useEffect(()=>{
    actions[names[0]].reset().fadeIn(0.5).play()
  },[])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.screen} scale={[1, 1, 1.382]} />
        <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.screen} position={[0, -0.335, 0]} scale={[1, 1, 1.382]} />
        <mesh name="Cube002" geometry={nodes.Cube002.geometry} material={materials['Material.002']} position={[-0.01, -0.335, -5.322]} scale={[1, 1.057, 0.726]} />
        <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials['Material.002']} position={[-0.01, -0.008, -5.322]} scale={[1, 1.057, 0.726]} />
        <mesh name="Cube004" geometry={nodes.Cube004.geometry} material={materials['Material.001']} position={[-0.01, -0.008, 5.344]} rotation={[Math.PI, 0, Math.PI]} scale={[1, 1.057, 0.726]} />
        <mesh name="Cube005" geometry={nodes.Cube005.geometry} material={materials['Material.001']} position={[-0.01, -0.335, 5.344]} rotation={[Math.PI, 0, Math.PI]} scale={[1, 1.057, 0.726]} />
        <mesh name="Cylinder" geometry={nodes.Cylinder.geometry} material={materials.screen} position={[1.043, 0.244, 5.345]} scale={0.575} />
        <mesh name="Cylinder001" geometry={nodes.Cylinder001.geometry} material={materials.screen} position={[-1.501, 0.244, -5.301]} scale={0.575} />
        <mesh name="Cylinder002" geometry={nodes.Cylinder002.geometry} material={materials.screen} position={[2.163, 0.244, -5.301]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder003" geometry={nodes.Cylinder003.geometry} material={materials.screen} position={[1.553, 0.244, -5.833]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder004" geometry={nodes.Cylinder004.geometry} material={materials.screen} position={[1.553, 0.244, -4.809]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder005" geometry={nodes.Cylinder005.geometry} material={materials.screen} position={[0.975, 0.244, -5.301]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder006" geometry={nodes.Cylinder006.geometry} material={materials.screen} position={[-0.891, 0.244, 5.356]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder007" geometry={nodes.Cylinder007.geometry} material={materials.screen} position={[-1.501, 0.244, 4.825]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder008" geometry={nodes.Cylinder008.geometry} material={materials.screen} position={[-1.501, 0.244, 5.848]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder009" geometry={nodes.Cylinder009.geometry} material={materials.screen} position={[-2.078, 0.244, 5.356]} scale={[0.295, 0.575, 0.295]} />
        <mesh name="Cylinder010" geometry={nodes.Cylinder010.geometry} material={materials.screen} position={[2.19, 0.26, 4.838]} scale={[0.1, 0.575, 0.1]} />
        <mesh name="Cylinder011" geometry={nodes.Cylinder011.geometry} material={materials.screen} position={[-2.407, 0.26, -4.688]} scale={[0.1, 0.575, 0.1]} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/consola1.glb')
