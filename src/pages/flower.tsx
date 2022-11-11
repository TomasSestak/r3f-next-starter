import dynamic from 'next/dynamic';
import useStore from '@/helpers/store';

const Flower = dynamic(() => import('@/components/canvas/Flower'), {
	ssr: false,
});

// DOM elements here
const DOM = () => {
	return <></>;
};

// Canvas/R3F components here
const R3F = () => {
	return (
		<>
			<Flower />
		</>
	);
};

export default function Page() {
	return (
		<>
			<DOM />
			<R3F />
		</>
	);
}
