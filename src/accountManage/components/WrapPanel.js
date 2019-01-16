import React from 'react';

import './WrapPanel.less'

class PanelHeader extends React.PureComponent {
	render() {
		const { header, left = '', right = '' } = this.props;
		return (
			<div className='wrap-panel-header'>
				<div className='wrap-panel-header-content'>
					<div className='wrap-panel-header-text'>{header}</div>
					{left ? <div className='wrap-panel-header-left'>{left}</div> : null}
					<em className="wrap-panel-header-line" />
					{right ? <div className='wrap-panel-header-right'>{right}</div> : null}
				</div>
			</div>
		);
	}
}

class WrapPanel extends React.Component {
	render() {
		const { header = '', navId = '', left = '', right = '' } = this.props;
		return <div className={'wrap-panel' + (navId ? ' J-scroll-follow-nav' : '')} id={navId}>
			<PanelHeader header={header} left={left} right={right} />
			<div className='wrap-panel-body'>
				{this.props.children}
			</div>
		</div>;
	}
}

export default WrapPanel
