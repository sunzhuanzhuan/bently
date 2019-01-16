import { createHttpAction } from '../../store/ajaxMiddleware'
import { Interface } from "../constants";
//header

export const {
	getHeader,
	getHeader_success
} = createHttpAction('getHeader', Interface.getHeader);

//所属行业
export const {
	getIndustryList,
	getIndustryList_success
} = createHttpAction('getIndustryList', Interface.getIndustryList);

//热门分类
export const {
	getHotcategoryList,
	getHotcategoryList_success
} = createHttpAction('getHotcategoryList', Interface.getHotcategoryList);

//证书	
export const {
	getImgList,
	getImgList_success
} = createHttpAction('getImgList', Interface.getImgList);
//获取活动
export const {
	getVideoCampaignInfo,
	getVideoCampaignInfo_success
} = createHttpAction('getVideoCampaignInfo', Interface.getVideoCampaignInfo);
//修改活动	
export const {
	updateVideoCampaign,
	updateVideoCampaign_success
} = createHttpAction('updateVideoCampaign', Interface.updateVideoCampaign, {
	method: 'post'
});
//创建活动
export const {
	addVideoCampaign,
	addVideoCampaign_success
} = createHttpAction('addVideoCampaign', Interface.addVideoCampaign, {
	method: 'post'
});
//上传视频
export const {
	uploadVideo,
	uploadVideo_success
} = createHttpAction('uploadVideo', Interface.uploadVideo, {
	method: 'post'
});
//getuploadtoken获取上传token
export const {
	getUploadToken,
	getUploadToken_success
} = createHttpAction('getUploadToken', Interface.getUploadToken);
