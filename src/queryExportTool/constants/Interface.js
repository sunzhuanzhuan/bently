const baseUrl = 'operator-gateway/search/export'//java重构接口
const branchUrl = 'operator-gateway/search/export/branch'//java二次重构
const quotationUrl = "operator-gateway/export/account/quotation"//java二次重构
export default {
    //获取公司列表
    getCompanyList: "/export/account/getCompanyList",
    //账号列表
    //getAccountList: '/export/account/search',
    //其他平台搜索
    otherPlatformSearch: baseUrl + '/otherPlatformSearch',
    //小红书
    smallRedBookSearch: baseUrl + '/smallRedBookSearch',
    //视频/直播
    videoSearch: baseUrl + '/videoSearch',
    //新浪
    xinaSearch: baseUrl + '/xinaSearch',
    //微信
    weixinSearch: baseUrl + '/weiXinSearch',
    //批量查找账号列表
    getBatchSearch: baseUrl + '/batchSearch',

    //报价单详情账号列表
    getQuotationAccountSearch: baseUrl + '/quotationList',
    //获取sku价格及平均价格
    getAccountPrice: baseUrl + '/account/price',
    //获取购物车列表
    getCartSearchAll: baseUrl + '/cartList',

    //批量查号下载
    batchAccountExport: branchUrl + "/batchAccountExport",
    //账号详情
    getBaseInfo: baseUrl + "/getBaseInfo",
    //账号详情---账号评价
    getDegreeList: "/export/account/getDegreeList",
    //账号详情---最近应约价
    getRecentReservationOrderPriceList: "/export/account/getRecentReservationOrderPriceList",
    //账号详情---最近应约价格数量
    getRecentReservationOrderPriceNum: "/export/account/getHistoryPriceCount",
    //获取购物车
    getAccountListFromCart: branchUrl + '/loadAccountListFromCart',

    //删除购物车数据
    removeFromCart: branchUrl + "/removeFromCart",
    //添加购物车数据
    addToCart: branchUrl + "/addToCart",
    //全部清空
    clearCart: branchUrl + "/clearCart",
    //下载中心列表
    getDownloadList: branchUrl + '/getQuotationDownloadList',
    //下载
    download: branchUrl + "/download",
    //重新下载
    reDownload: branchUrl + "/reDownload",
    //添加报价单
    saveQuotation: branchUrl + "/saveQuotation",
    //报价单详情批量删除
    deleteFromCart: branchUrl + "/deleteFromQuotation",
    //报价单导出全部账号
    quotationExport: branchUrl + "/quotationExport",
    //报价单导出验证
    preExportNumCheck: branchUrl + "/preExportNumCheck",
    //获取报价单ID
    getAccountIdsByQuotation: branchUrl + "/getAccountIdsByQuotation",
    //验证码验证是否正确
    codeCheck: branchUrl + "/codeCheck",
    //将账号添加进报价单
    addToQuotation: branchUrl + "/addToQuotation",
    //获取公共分类
    getCommonClassify: '/accountList/api/getCommonClassify',
    //获取查询项
    getFilters: baseUrl + '/getFiltersMeta',
    // 获取内容分类、人设分类和风格分类
    getClassifications: baseUrl + '/operator-gateway/account/classifications',
    //报价单模版
    getStencilList: quotationUrl + "/templateList",
    //报价单详情
    getQuotationDetail: quotationUrl + "/detail",
    //报价单列表
    getQuotationList: quotationUrl + "/list",

}
