import React from 'react';
import { BROWSE_DATA } from '../../helpers/constants';

function Browse({ setShowBrowse }) {
	return (
		<div id='browse-menu' onMouseLeave={() => setShowBrowse(false)}>
			<div id='browse-left-box'>
				<ul id='browse-ul-main'>
					{BROWSE_DATA.ulMain.map((link) => (
						<li key={link} onClick={() => setShowBrowse(false)}>
							{link}
						</li>
					))}
				</ul>
			</div>
			<div id='browse-right-box'>
				<ul id='browse-ul-left'>
					{BROWSE_DATA.ulLeft.map((link) => (
						<li key={link} onClick={() => setShowBrowse(false)}>
							{link}
						</li>
					))}
				</ul>
				<ul id='browse-ul-center'>
					{BROWSE_DATA.ulCenter.map((link) => (
						<li key={link} onClick={() => setShowBrowse(false)}>
							{link}
						</li>
					))}
				</ul>
				<ul id='browse-ul-right'>
					{BROWSE_DATA.ulRight.map((link) => (
						<li key={link} onClick={() => setShowBrowse(false)}>
							{link}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default Browse;
