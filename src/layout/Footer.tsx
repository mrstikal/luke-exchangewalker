import { memo } from 'react'
const Footer = () => {
	return (
		<div className="py-4 px-6 bg-gray-800 sticky w-full bottom-0">
			<div className="le-wrapper flex justify-between gap-4 px-6">
				<div className="self-center ml-1 text-gray-300 text-sm">Proudly created by Alexej Mrštík</div>
				<div className="self-center mr-1 text-gray-300 text-sm text-right">We stand on the light side of the Force :)</div>
			</div>
		</div>
	)
}

export default memo(Footer);