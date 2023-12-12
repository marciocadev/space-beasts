import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { useAtom } from "jotai";
import { useState } from "react";
import { charactersAtom, socket } from "./SocketManager";
import { RigidBody } from "@react-three/rapier";
import { MechController } from "./MechController";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

export const Experience = () => {
  const { moveForward, moveBackward, moveLeft, moveRight } = useKeyboardControls();
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[-25, 18, -25]}
        intensity={0.35}
        castShadow
        shadow-mapSize={[4096, 4096]}
      />
      <OrbitControls />
      <RigidBody colliders="trimesh" type="fixed">
        <mesh
          rotation-x={-Math.PI / 2}
          position-y={-0.001}
          receiveShadow
          onClick={(e) => socket.send(
            JSON.stringify({
              move: [e.point.x, 0, e.point.z]
            })
          )}
          onPointerEnter={() => setOnFloor(true)}
          onPointerLeave={() => setOnFloor(false)}
        >
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#464544" />
        </mesh>
      </RigidBody>

      {
        characters.map((c) => (
          <MechController key={c.id} animal={c.animal} position={c.position} />
        ))
      }
    </>
  )
}