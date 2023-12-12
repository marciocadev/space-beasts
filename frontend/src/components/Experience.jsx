import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { useState } from "react";
import { charactersAtom, socket } from "./SocketManager";
import { RigidBody } from "@react-three/rapier";
import { MechController } from "./MechController";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { Map } from "./Map";

export const Experience = () => {
  const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboardControls();
  const [characters] = useAtom(charactersAtom);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[-25, 100, -25]}
        intensity={0.35}
        castShadow
        shadow-mapSize={[4096, 4096]}
      />
      <OrbitControls />
      <Map />
      {
        characters.map((c, idx) => (
          <MechController
            key={c.id}
            animal={c.animal}
            position={c.position}
            position-x={idx * 2}
          />
        ))
      }
    </>
  )
}