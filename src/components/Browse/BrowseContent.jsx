import React from 'react';
import { BROWSE_DATA } from '../../helpers/constants';

function BrowseContent({ handleBrowse }) {
	return (
		<div className='browse-menu'>
			<div className='browse-left-box'>
				<ul className='browse-ul-main'>
					{BROWSE_DATA.ulMain.map((link) => (
						<li key={link} onClick={handleBrowse}>
							{link}
						</li>
					))}
				</ul>
			</div>
			<div className='browse-right-box'>
				<ul className='browse-ul-left'>
					{BROWSE_DATA.ulLeft.map((link) => (
						<li key={link} onClick={handleBrowse}>
							{link}
						</li>
					))}
				</ul>
				<ul className='browse-ul-center'>
					{BROWSE_DATA.ulCenter.map((link) => (
						<li key={link} onClick={handleBrowse}>
							{link}
						</li>
					))}
				</ul>
				<ul className='browse-ul-right'>
					{BROWSE_DATA.ulRight.map((link) => (
						<li key={link} onClick={handleBrowse}>
							{link}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default BrowseContent;
