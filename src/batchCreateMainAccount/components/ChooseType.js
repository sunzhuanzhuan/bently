import React from 'react'
import { Button } from 'antd';
import './ChooseType.less'

export const ChooseType = (props) => {
	return (
		<div>
			{
				props.authVisibleList['batch.operate.add.selfmedia.user'] == true ?
					<section>
						<h4 className="main-account-batch-option">主账号批量操作</h4>
						<Button type="primary" onClick={() => props.createMainAccount()}>创建主账号</Button>
					</section> : null
			}
			{
				props.authVisibleList['batch.operate.add.micro.put'] == true ||
					props.authVisibleList['batch.operate.add.account'] == true ||
					props.authVisibleList['batch.operate.is.online'] == true ||
				props.authVisibleList['batch.operate.edit.account.publicationPrice'] == true ?
					<section>
						<h4 className="main-account-batch-option main-account-batch-option-marginTop">账号批量操作</h4>
						{
							props.authVisibleList['batch.operate.add.micro.put'] == true ?
								<Button type="primary" onClick={() => props.microPutAttribute()}>标记微闪投账号</Button>
								: null
						}
						{
							props.authVisibleList['batch.operate.add.account'] == true ?
								<Button type="primary" className="accountPutAttribute-btn"
									onClick={() => props.accountPutAttribute()}>账号入库</Button>
								: null
						}
						{
							props.authVisibleList['batch.operate.is.online'] == true ?
								<Button type="primary" className="accountPutAttribute-btn"
									onClick={() => props.accountOnLine()}
								>账号上下架</Button> : null
						}
						{
							props.authVisibleList['batch.operate.change.main.account'] == true ?
								<Button type="primary" onClick={() => props.changeMainAccount()}
									className="accountPutAttribute-btn">更换主账号</Button> : null
						}
						{
							props.authVisibleList['batch.operate.edit.account.price'] == true ?
								<Button style={{marginRight: 10}} type="primary" className="accountPutAttribute-btn"
									onClick={() => props.editAccountPrice()}
								>修改账号报价</Button> : null
						}
						{
							(props.authVisibleList['batch.operate.edit.account.price'] == true || props.authVisibleList['batch.operate.edit.account.publicationPrice'] == true) ?
								<Button type="primary" className={props.authVisibleList['batch.operate.edit.account.publicationPrice'] == true ? "" : "accountPutAttribute-btn"}
									onClick={() => props.editAccountPriceFull()}
								>更新刊例价</Button> : null
						}
					</section> : null
			}
		</div>
	)
}
