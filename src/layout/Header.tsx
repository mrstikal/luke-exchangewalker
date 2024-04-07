import { memo } from 'react'
const Header = () => {
	return (
		<div className="py-4 px-6 bg-gray-800">
			<div className="le-wrapper flex justify-between px-6">
				<div className="logo self-center" />
				<div className="x-wing self-center" />
			</div>
		</div>
	);
}

export default memo(Header);