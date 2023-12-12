import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

function App() {
  return (
    <>
      <SocketManager />
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 30 }} >
        <color attach="background" args={["#242424"]} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App;