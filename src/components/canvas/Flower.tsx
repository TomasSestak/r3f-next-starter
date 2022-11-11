import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Flower = () => {
	const { scene } = useLoader(GLTFLoader, '/3d-models/poly.glb');

	return (
		<>
			<primitive object={scene} scale={10} />
			<ambientLight />
		</>
	);
};

export default Flower;
