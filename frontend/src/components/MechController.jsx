import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { MechBarbaraTheBee } from "./mech/Mech_BarbaraTheBee";
import { MechFernandoTheFlamingo } from "./mech/Mech_FernandoTheFlamingo";
import { MechFinnTheFrog } from "./mech/Mech_FinnTheFrog";
import { MechRaeTheRedPanda } from "./mech/Mech_RaeTheRedPanda";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const MOVEMENT_SPEED = 200;

export const MechController = ({
  id,
  color,
  position,
  animal,
  userPlayer,
  ...props
}) => {
  const group = useRef();
  const character = useRef();
  const rigidbody = useRef();
  const [animation, setAnimation] = useState("Idle");

  useFrame((_, delta) => {
    if (!rigidbody.current) return;

    const vector1 = vec3(rigidbody.current.translation());
    const vector2 = new THREE.Vector3(position[0], position[1], position[2]);
    if (vector1.distanceTo(vector2) > 0.1) {
      setAnimation("Run");
      character.current.lookAt(vector2);
      const direction = new THREE.Vector3().copy(vector2).sub(vector1).normalize();
      const impulse = delta * MOVEMENT_SPEED;
      rigidbody.current.applyImpulse(direction.multiplyScalar(impulse), true);
    } else {
      setAnimation("Idle");
    }
  });

  switch (animal) {
    case "bee":
      return (
        <group ref={group} {...props}>
          <RigidBody ref={rigidbody} colliders={false} linearDamping={12} lockRotations>
            <group ref={character}>
              <MechBarbaraTheBee
                key={id}
                animation={animation}
                color={color}
              />
            </group>
            <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
          </RigidBody>
        </group>
      )
    case "frog":
      return (
        <group ref={group} {...props}>
          <RigidBody ref={rigidbody} colliders={false} linearDamping={12} lockRotations>
            <group ref={character}>
              <MechFinnTheFrog
                key={id}
                animation={animation}
                color={color}
              />
            </group>
            <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
          </RigidBody>
        </group>
      )
    case "redpanda":
      return (
        <group ref={group} {...props}>
          <RigidBody ref={rigidbody} colliders={false} linearDamping={12} lockRotations>
            <group ref={character}>
              <MechRaeTheRedPanda
                key={id}
                animation={animation}
                color={color}
              />
            </group>
            <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
          </RigidBody>
        </group>
      )
    case "flamingo":
      return (
        <group ref={group} {...props}>
          <RigidBody ref={rigidbody} colliders={false} linearDamping={12} lockRotations>
            <group ref={character}>
              <MechFernandoTheFlamingo
                key={id}
                animation={animation}
                color={color}
              />
            </group>
            <CapsuleCollider args={[0.7, 0.6]} position={[0, 1.28, 0]} />
          </RigidBody>
        </group>
      )
  }
}