import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useDrag } from '@use-gesture/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-spring/three';
import { OrbitControls, PresentationControls, TransformControls, Bounds } from '@react-three/drei';

import { animated } from '@react-spring/three';
import { Group } from 'three';

const Single = (props) => {
	const { scene } = useLoader(GLTFLoader, '/3d-models/poly.glb');
	return <primitive object={scene} {...props} />;
};

export interface FlowerState {
	flowers: number;
	setFlowers: Dispatch<SetStateAction<number>>;
}

const Flower = ({ flowers, setFlowers }: FlowerState) => {
	const { size, viewport } = useThree();
	const aspect = size.width / viewport.width;
	const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0], config: { friction: 10 } }));
	const bind = useGesture({
		onDrag: ({ offset: [x, y] }) => set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] }),
	});

	const { scene } = useLoader(GLTFLoader, '/3d-models/flower.gltf');

	const [scenes, setScenes] = useState<Group[]>([]);

	useEffect(() => {
		const newScenes = Array(flowers)
			.fill(0)
			.map(() => {
				return scene.clone();
			});
		setScenes(newScenes);
	}, [flowers, scene]);

	console.log(scenes);

	return (
		<>
			<PresentationControls>
				<group scale={5}>
					{scenes.map((value, index) => {
						return <primitive object={value} key={index} position={[index / 20, 0, 0]} />;
					})}
				</group>
			</PresentationControls>
			<ambientLight />
		</>
	);
};

export default Flower;
