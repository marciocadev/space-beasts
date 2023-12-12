import { useState } from "react";
import { socket } from "./SocketManager";
import { RigidBody } from "@react-three/rapier";
import { useCursor } from "@react-three/drei";

export const Map = () => {
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
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
    </>
  );
}