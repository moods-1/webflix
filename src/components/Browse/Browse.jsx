import React from 'react';
import { BROWSE_DATA } from '../../helpers/constants';
import ClickOutsideHandler from '../ClickOutsideHandler';

function Browse({ setShowBrowse }) {
	return (
		<ClickOutsideHandler outsideFunction={() => setShowBrowse(false)}>
			<div id='browse-menu'>
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
		</ClickOutsideHandler>
	);
}
export default Browse;
