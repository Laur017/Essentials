/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 public/models/coffee.glb
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/coffee.glb')
  const { actions,names } = useAnimations(animations, group)
  
  useEffect(()=>{
    actions[names[0]].reset().fadeIn(0.5).play()
  },[])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Circle002">
          <mesh name="Circle002_1" geometry={nodes.Circle002_1.geometry} material={materials.coffee} />
          <mesh name="Circle002_2" geometry={nodes.Circle002_2.geometry} material={materials['Material.001']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/coffee.glb')
