import {
  ContactShadows,
  Environment,
} from "@react-three/drei"

import {
  Canvas,
  useThree,
} from "@react-three/fiber"

import {
  useEffect,
} from "react"

import * as THREE from "three"

import Model from "./Model/Model"

import "./Experience.css"

// =====================================
// RENDERER SETTINGS
// =====================================

const RendererSettings = () => {
  const {
    gl,
  } = useThree()

  useEffect(() => {
    gl.outputColorSpace =
      THREE.SRGBColorSpace

    gl.toneMapping =
      THREE.ACESFilmicToneMapping

    gl.toneMappingExposure =
      1
  }, [
    gl,
  ])

  return null
}

// =====================================
// EXPERIENCE
// =====================================

const Experience = () => {
  return (
    <div className="experience-container">
      <Canvas
        camera={{
          position: [5, 4, 7],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <RendererSettings />

        <Environment
          preset="sunset"
          environmentIntensity={1}
        />

        <ambientLight
          intensity={1}
        />

        <Model />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.6}
          scale={51}
          blur={2.5}
          far={150}
          resolution={1024}
          color="#000000"
        />
      </Canvas>
    </div>
  )
}

export default Experience