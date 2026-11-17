import * as THREE from 'three';

/** Critically damped camera channels retain their velocity when a visitor retargets mid-flight. */
export function createCameraFlight(camera: THREE.PerspectiveCamera, initialDistance: number) {
  const values = [0, 0, 0, initialDistance, 0, 43];
  const velocities = values.map(() => 0);
  const target = new THREE.Vector3();
  return {
    update(center: THREE.Vector3, distance: number, offset: number, entered: boolean, dt: number, reduced: boolean) {
      const goals = [center.x, center.y, center.z, distance, offset, entered ? 39 : 43];
      let moving = false;
      const omega = entered ? 8 : 9;
      const decay = Math.exp(-omega * dt);
      goals.forEach((goal, i) => {
        if (reduced) { values[i] = goal; velocities[i] = 0; return; }
        const delta = values[i] - goal;
        const impulse = velocities[i] + omega * delta;
        values[i] = goal + (delta + impulse * dt) * decay;
        velocities[i] = (velocities[i] - omega * impulse * dt) * decay;
        moving ||= Math.abs(values[i] - goal) > .0005 || Math.abs(velocities[i]) > .002;
      });
      // A restrained dolly arc comes from the flight's velocity, never the heartbeat.
      const arc = THREE.MathUtils.clamp(velocities[3] * .015, -.12, .12);
      target.set(values[0] + values[4], values[1], values[2]);
      camera.position.set(target.x + arc, target.y + Math.abs(arc) * .35, target.z + values[3]);
      camera.lookAt(target);
      camera.fov = values[5];
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      return moving;
    },
  };
}
