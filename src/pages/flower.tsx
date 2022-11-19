import dynamic from 'next/dynamic';
import useStore from '@/helpers/store';
import { Dispatch, SetStateAction, useState } from 'react';
import { FlowerState } from '@/components/canvas/Flower';

const Flower = dynamic(() => import('@/components/canvas/Flower'), {
	ssr: false,
});

// DOM elements here
const DOM = ({ setFlowers, flowers }: FlowerState) => {
	console.log(flowers);
	return (
		<button onClick={() => setFlowers((flowers) => flowers + 1)} className={'mx-auto bg-orange-400 grid mt-8'}>
			Add flower
		</button>
	);
};

// Canvas/R3F components here
const R3F = ({ setFlowers, flowers }: FlowerState) => {
	return (
		<>
			<Flower setFlowers={setFlowers} flowers={flowers} />
		</>
	);
};

export default function Page() {
	const [flowers, setFlowers] = useState(1);

	return (
		<>
			<DOM flowers={flowers} setFlowers={setFlowers} />
			<R3F flowers={flowers} setFlowers={setFlowers} />
		</>
	);
}
