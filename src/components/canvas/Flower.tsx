import { ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useDrag } from '@use-gesture/react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring } from '@react-spring/three';
import { OrbitControls, PresentationControls, TransformControls, Bounds, Select, useSelect, PivotControls } from '@react-three/drei';

import { animated } from '@react-spring/three';
import { Group, Object3D } from 'three';

const Single = (props) => {
	const { scene } = useLoader(GLTFLoader, '/3d-models/poly.glb');
	return <primitive object={scene} {...props} />;
};

export interface FlowerState {
	flowers: number;
	setFlowers: Dispatch<SetStateAction<number>>;
}

const Flower = ({ flowers, setFlowers }: FlowerState) => {
	const { scene, nodes, materials } = useLoader(GLTFLoader, '/3d-models/flower.gltf');

	const [scenes, setScenes] = useState<Group[]>([]);

	useEffect(() => {
		const newScenes = Array(flowers)
			.fill(0)
			.map(() => {
				return scene.clone();
			});
		setScenes(newScenes);
	}, [flowers, scene]);

	const [disabled, setDisabled] = useState(false);
	const [selected, setSelected] = useState<Object3D[]>([]);
	const active = selected[0];

	return (
		<>
			<OrbitControls enableDamping={false} enablePan={false} enableZoom={true} enableRotate={true} enabled={!disabled} makeDefault />
			{/*<Select box multiple onChange={console.log} filter={(items) => items}>*/}
			{/*<PivotControls>*/}
			{/*<group scale={1}>*/}
			{/*<PresentationControls>*/}
			{active && <TransformControls object={active} />}
			<Select onChange={setSelected}>
				{scenes.map((value, index) => {
					return (
						<group key={index}>
							<primitive scale={10} object={value.children[2]} position={[index * 0.1, index * 0.1, 0]} />
						</group>
					);
				})}
			</Select>
			{/*</PresentationControls>*/}
			{/*</group>*/}
			{/*</PivotControls>*/}
			{/*</Select>*/}
			<ambientLight />
		</>
	);
};

export default Flower;
