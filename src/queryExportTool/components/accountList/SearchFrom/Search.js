import React from 'react';
import { Input, Icon, Checkbox, Row, Col } from 'antd';
import './index.less';
const Search = Input.Search;

export class DefaultSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			show: false
		}
	}

    componentDidMount() {
        document.addEventListener('click', this.handleMouseUp, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleMouseUp, false)
    }

    handleMouseUp = (e) => {
        this.setState({
            show: false
        });
    }

	emitEmpty = () => {
		const { onSearch } = this.props;
		this.userNameInput.focus();
		// this.setState({ userName: '' });
		this.userName = '';
		this.props.form.setFieldsValue({ keyword: '' });
		onSearch && onSearch({ optionsNames: '' });
	}

	componentWillReceiveProps(nextProps) {
		// debugger;
		if ("keyword" in nextProps) {
			this.setState({
				userName: nextProps.keyword
			})
		}
	}

	onSearch = () => {
		const { form } = this.props;
		const { onSearch } = this.props;
		const userName = form.getFieldValue('keyword')
		onSearch && onSearch({ optionsNames: userName || '' });

	}

    typeClick = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        const searchTypePopover = document.getElementById('searchTypePopover');
        if (searchTypePopover.contains(e.target)) {
            return;
        }
        this.setState({
            show: !this.state.show
        });
    }

	typeChange = (values) => {
		const { typeChange } = this.props;
		if (typeChange && typeof typeChange === 'function') {
            typeChange(values);
        }
	}
	// onChangeUserName = (e) => {
	// 	// const { onChange } = this.props;
	// 	// this.setState({ userName: e.target.value });
	// 	// this.userName = e.target.value;
	// 	// onChange && onChange({ userName: e.target.value })
	// }
	render() {

		const { form, showSearchType = false, keywordsOptions = [] } = this.props;
		const { getFieldDecorator } = form;
		const { userName } = this.state;
		const suffix = userName ? <span key='1' style={{ padding: "0 10px" }}><Icon type="close-circle" onClick={this.emitEmpty} /></span> : null;
		return (
			<div style={{
				margin: "0 auto",
				padding: "0 0 10px 0",
				// background: "#EDEDED",
				textAlign: "center"
			}} className='common-search'>
                {
                    showSearchType &&
                    <div className='search-type' onClick={this.typeClick}>
                        <span>默认全选</span>
                        <Icon type="down" style={{transform: `rotateZ(${this.state.show ? 180 : 0}deg)`}}/>
                        <div id='searchTypePopover' className='search-type-popover' style={{display: this.state.show ? 'block' : 'none'}}>
                            <Checkbox.Group
								value={keywordsOptions}
								onChange={this.typeChange}
								style={{ width: '100%' }}>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value='sns_name'>账号名称</Checkbox>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value='sns_id'>账号id</Checkbox>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value='classification'>账号分类标签</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>
                }
                <div className='search-input'>
                    {getFieldDecorator('keyword', {
                        initialValue: userName
                    })(
                        <Search
                            // onChange={this.onChangeUserName}
                            style={{ width: "440px" }}
                            placeholder="请输入账号名称、账号ID 、分类标签"
                            suffix={suffix}
                            enterButton
                            onSearch={this.onSearch}
                            ref={node => this.userNameInput = node}
                            autoComplete="off"
                        />
                    )}
                </div>
			</div>
		);
	}
}


export default DefaultSearch;
