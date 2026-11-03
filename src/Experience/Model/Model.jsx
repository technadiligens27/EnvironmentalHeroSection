
import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useAnimations,
  useGLTF,
  useTexture,
} from "@react-three/drei"

import * as THREE from "three"

import ScaleModelOnHover from "../../ScaleModelOnHover/ScaleModelOnHover"

// ==========================================
// RESPONSIVE MODEL SETTINGS
// ==========================================

const getResponsiveSettings = (width) => {

  // EXTRA SMALL MOBILE
  // 360px and below
  if (width <= 360) {
    return {
      position: [0.52, -0.3, 0.6],
      rotation: [-0.15, 0.58, 0.09],
      scale: 2.2,
    }
  }

  // SMALL MOBILE
  // 361px - 480px
  if (width <= 480) {
    return {
      position: [0.52, -0.6, 0.6],
      rotation: [-0.15, 0.58, 0.09],
      scale: 2.5,
    }
  }

  // MOBILE
  // 481px - 768px
  if (width <= 768) {
    return {
      position: [0.52, -0.6, 0.6],
      rotation: [-0.15, 0.58, 0.09],
      scale: 2.8,
    }
  }

  // TABLET
  // 769px - 1024px
  if (width <= 1024) {
    return {
      position: [0.52, -1, 0.6],
      rotation: [-0.15, 0.58, 0.09],
      scale: 3.1,
    }
  }

  // DESKTOP / LAPTOP
  // Above 1024px
  return {
    position: [0.52, -1, 0.6],
    rotation: [-0.15, 0.58, 0.09],
    scale: 3.4,
  }
}

// ==========================================
// MODEL
// ==========================================

const Model = ({
  animationSpeed = 1,
}) => {

  const tree01Ref = useRef(null)
  const tree02Ref = useRef(null)
  const tree03Ref = useRef(null)

  const bush01Ref = useRef(null)
  const bush02Ref = useRef(null)
  const bush03Ref = useRef(null)

  const treeSmallRef = useRef(null)

  const [
    isStartupAnimationFinished,
    setIsStartupAnimationFinished,
  ] = useState(false)

  // ==========================================
  // RESPONSIVE SCREEN DETECTION
  // ==========================================

  const [
    screenWidth,
    setScreenWidth,
  ] = useState(() => window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener(
      "resize",
      handleResize
    )

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      )
    }
  }, [])

  // ==========================================
  // RESPONSIVE TRANSFORMS
  // ==========================================

  const responsiveSettings =
    getResponsiveSettings(screenWidth)

  const modelPosition =
    responsiveSettings.position

  const modelRotation =
    responsiveSettings.rotation

  const modelScale =
    responsiveSettings.scale

  // ==========================================
  // LOAD MODEL + BAKED TEXTURE
  // ==========================================

  const modelPath =
    `${import.meta.env.BASE_URL}Tree.glb`

  const texturePath =
    `${import.meta.env.BASE_URL}TreeBaked02.png`

  const {
    scene,
    animations,
  } = useGLTF(modelPath)

  const bakedTexture =
    useTexture(texturePath)

  // ==========================================
  // APPLY BAKED TEXTURE
  // ==========================================

  useEffect(() => {
    bakedTexture.flipY = false

    bakedTexture.colorSpace =
      THREE.SRGBColorSpace

    bakedTexture.needsUpdate = true

    scene.traverse((child) => {
      if (!child.isMesh) {
        return
      }

      child.castShadow = true
      child.receiveShadow = true

      const createMaterial = () => {
        return new THREE.MeshPhysicalMaterial({
          map: bakedTexture,

          color: "#ffffff",

          roughness: 0.72,

          metalness: 0,

          transmission: 0,

          clearcoat: 0,

          clearcoatRoughness: 0.5,
        })
      }

      if (
        Array.isArray(child.material)
      ) {
        child.material =
          child.material.map(() =>
            createMaterial()
          )
      } else {
        child.material =
          createMaterial()
      }
    })
  }, [
    scene,
    bakedTexture,
  ])

  // ==========================================
  // GET INDIVIDUAL MODEL REFERENCES
  // ==========================================

  useEffect(() => {
    tree01Ref.current =
      scene.getObjectByName("tree01")

    tree02Ref.current =
      scene.getObjectByName("tree02")

    tree03Ref.current =
      scene.getObjectByName("tree03")

    bush01Ref.current =
      scene.getObjectByName("bush01")

    bush02Ref.current =
      scene.getObjectByName("bush02")

    bush03Ref.current =
      scene.getObjectByName("bush03")

    treeSmallRef.current =
      scene.getObjectByName("treeSmall")
  }, [scene])

  // ==========================================
  // PLAY GLB ANIMATION ONCE
  // ==========================================

  const {
    actions,
    names,
  } = useAnimations(
    animations,
    scene
  )

  useEffect(() => {
    const animationName =
      names[0]

    if (!animationName) {
      return
    }

    const action =
      actions[animationName]

    if (!action) {
      return
    }

    const mixer =
      action.getMixer()

    const handleAnimationFinished = (
      event
    ) => {
      if (event.action !== action) {
        return
      }

      // Keep the final animation frame visible
      action.time =
        action.getClip().duration

      action.paused = true

      setIsStartupAnimationFinished(
        true
      )
    }

    mixer.addEventListener(
      "finished",
      handleAnimationFinished
    )

    setIsStartupAnimationFinished(
      false
    )

    action.stop()
    action.reset()

    action.setLoop(
      THREE.LoopOnce,
      1
    )

    action.clampWhenFinished = true

    action.enabled = true
    action.paused = false

    action.timeScale =
      Math.abs(animationSpeed)

    action.play()

    return () => {
      mixer.removeEventListener(
        "finished",
        handleAnimationFinished
      )

      action.stop()
    }
  }, [
    actions,
    names,
    animationSpeed,
  ])

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <>
      <group
        position={modelPosition}
        rotation={modelRotation}
        scale={modelScale}
      >
        <primitive object={scene} />
      </group>

      {/* HOVER EFFECTS AFTER STARTUP */}

      {isStartupAnimationFinished && (
        <>
          <ScaleModelOnHover
            modelRef={tree01Ref}
            hoverScale={1.1}
          />

          <ScaleModelOnHover
            modelRef={tree02Ref}
            hoverScale={1.1}
          />

          <ScaleModelOnHover
            modelRef={tree03Ref}
            hoverScale={1.1}
          />

          <ScaleModelOnHover
            modelRef={bush01Ref}
            hoverScale={1.1}
          />

          <ScaleModelOnHover
            modelRef={bush02Ref}
            hoverScale={1.1}
          />

          <ScaleModelOnHover
            modelRef={bush03Ref}
            hoverScale={1.1}
          />

          <ScaleModelOnHover
            modelRef={treeSmallRef}
            hoverScale={1.1}
          />
        </>
      )}
    </>
  )
}

// ==========================================
// PRELOAD MODEL
// ==========================================

useGLTF.preload(
  `${import.meta.env.BASE_URL}Tree.glb`
)

useTexture.preload(
  `${import.meta.env.BASE_URL}TreeBaked02.png`
)

export default Model
