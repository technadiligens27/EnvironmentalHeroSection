import {
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

const ScaleModelOnHover = ({
  modelRef,

  hoverScale = 1.1,

  animationSpeed = 8,
}) => {
  const {
    gl,
  } = useThree()

  const originalScaleRef =
    useRef(null)

  const isHoveredRef =
    useRef(false)

  const hasPointerMovedRef =
    useRef(false)

  const raycasterRef =
    useRef(new THREE.Raycaster())

  const targetScaleRef =
    useRef(new THREE.Vector3())

  // ==========================================
  // WAIT FOR REAL USER MOUSE MOVEMENT
  // ==========================================

  useEffect(() => {
    const handlePointerMove = () => {
      hasPointerMovedRef.current =
        true
    }

    gl.domElement.addEventListener(
      "pointermove",
      handlePointerMove
    )

    return () => {
      gl.domElement.removeEventListener(
        "pointermove",
        handlePointerMove
      )

      document.body.style.cursor =
        "auto"
    }
  }, [
    gl,
  ])

  // ==========================================
  // HOVER SCALE
  // ==========================================

  useFrame((state, delta) => {
    const model =
      modelRef?.current

    if (!model) {
      return
    }

    // Save the model scale only once.
    if (!originalScaleRef.current) {
      originalScaleRef.current =
        model.scale.clone()
    }

    // Prevent R3F's default pointer position
    // from instantly enlarging a centre model.
    if (!hasPointerMovedRef.current) {
      return
    }

    const raycaster =
      raycasterRef.current

    raycaster.setFromCamera(
      state.pointer,
      state.camera
    )

    const intersections =
      raycaster.intersectObject(
        model,
        true
      )

    const isHovered =
      intersections.length > 0

    if (
      isHovered !==
      isHoveredRef.current
    ) {
      isHoveredRef.current =
        isHovered

      document.body.style.cursor =
        isHovered
          ? "pointer"
          : "auto"
    }

    const originalScale =
      originalScaleRef.current

    const scaleMultiplier =
      isHovered
        ? hoverScale
        : 1

    targetScaleRef.current.set(
      originalScale.x *
        scaleMultiplier,

      originalScale.y *
        scaleMultiplier,

      originalScale.z *
        scaleMultiplier
    )

    const smoothAmount =
      1 -
      Math.exp(
        -animationSpeed * delta
      )

    model.scale.lerp(
      targetScaleRef.current,
      smoothAmount
    )
  })

  return null
}

export default ScaleModelOnHover