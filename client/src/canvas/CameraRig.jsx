import React from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { snapshot } from "valtio";

import state from "../store";

const CameraRig = ({ children }) => {
    return <group>{children}</group>
}

export default CameraRig