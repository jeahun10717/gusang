const Joi = require('joi');
const { params } = require('.');
const { franchise } = require('../../databases'); 

// 아래 함수에서 type 은 view 는 조회순, date 는 날짜순
exports.pagenate = async (ctx) => {
    // show/:type/:id 
    // 위의 api router 에서 type 은 최신순, 조회순
    const { type, pagenum } = ctx.params;
    
    // 페이지네이션을 위해서는 db 데이터의 개수를 알아야 함
    // const rowNum = await franchise.rowNum();
   
    // console.log(rowNum);
    // NaN 오류 발생 함. id 에
    if(type === 'view'){
        const result = await franchise.pageByView( pagenum, 2);
        ctx.body = {
            status : 200,
            result
        }
    }else if(type === 'date'){
        const result = await franchise.pageByNew( pagenum, 2);
        ctx.body = {
            status : 200,
            result
        }
    }else {
        ctx.throw(400);
    }
}

exports.detail = async (ctx) => {
    const { id } = ctx.params;

    // Promise 함수인데 await 안붙히면 Promise 리턴해서 무조건 true 값이 됨. VSS
    //isExist 는 값이 DB 에 있으면 1, 없으면 0 출력
    if(await franchise.isExist(id)){
        // 결과 값을 받았으면 담아야지
        const result = await franchise.show(id)
        ctx.body = {
            status : 200,
            result
       }        
    }else{
        ctx.throw(400)
    }
}

// /search/:type/:input api 라우트에 쓸 함수
// type 은 검색할 db의 column 의 종류, input 은 검색어 종류
exports.search = async (ctx) => {
    const { input } = ctx.params;

    searchName = input.split(' ');
    console.log(searchName);
    const result = await franchise.search(searchName[0],searchName[1],searchName[2]);

    console.log(result);
    ctx.body = {
        status : 200,
        result
    }
    // ctx.body = input
    // console.log(ctx.body);
    // console.log(ctx.request.query);
    // console.log(ctx.query , ' : 쿼리 확인용');
}

exports.create = async (ctx) => {
    const params = Joi.object({
        franchise_name : Joi.string().required(), // : 컨텐츠에 표시될 텍스트, 검색될 이름
        franchise_tag : Joi.string().required(), // : 프론트에서 정해줘야 함 ex) 양식, 중식, 분식 등등
        franchise_logo : Joi.string().required(), // : franchise 로고
        
        // 가맹정보 부분 //////////////////////////////////////////////////
        franchise_storenum : Joi.number().required(),     // 매장 수
        franchise_cost : Joi.number().required(),         // 창업 비용
        franchise_monthSale : Joi.number().required(),    // 월 평균 매출액
        // franchise_name //> 이 부분은 위에 등록 해 두었음 : 상호명   
        franchise_ceo : Joi.string().required(),  // 대표
        franchise_type : Joi.string().required(), // 사업자 유형
        franchise_address : Joi.string().required(), // 주소
        franchise_registnum : Joi.string().required(), // 사업자등록번호
        franchise_crn : Joi.string().required(),  // 법인등록번호
        franchise_phone : Joi.string().required(), // 대표 번호
        franchise_fax : Joi.string().required(),  // 대표 팩스 번호
        franchise_detailsale : Joi.string().required(), // 브랜드 창업 비용
                                           // 도표에 들어가는 자료인데 구분자로 여래개 받아서 넣을 듯
        // 그래프용 월평균 매출
        // 그래프용 가맹점 증감추이
        // 그래프용 가맹점 계약 현황
        // ////////////////////////////////////////////////////////////////
    
        brand_introduce : Joi.string().required(), // 브랜드 정보 / 브랜드 소개
        brand_menu : Joi.string().required(), // 브랜드 정보 / 브랜드 대표메뉴
        brand_competitiveness : Joi.string().required(), // 브랜드 정보 / 브랜드 경쟁력
        brand_video : Joi.string().required(), // 브랜드 정보 / 브랜드 홍보영상

        }).validate(ctx.request.body)

    if(params.error) {
        ctx.throw(400);
    }
    franchise.insert(params.value);

    ctx.body ={
        status: 200
    }
}

exports.delete = async(ctx) => {
    const { id } = ctx.params;

    console.log(ctx.params);
    //isExist 는 값이 DB 에 있으면 1, 없으면 0 출력
    if(franchise.isExist(id)){
        await franchise.delete(id)
        ctx.body = {
            status : 200
        }        
    }else{
        ctx.throw(400)
    }
}

exports.update = async (ctx) => {
    const { type, id } = ctx.params;
    if(await franchise.isExist(id)===0){
        ctx.throw(400)
    }
    if(type === 'basicInfo'){ // 기본 정보 수정
        const params = Joi.object({ 
            contents_name : Joi.string(), // 컨텐츠에 표시될 텍스트, 검색될 때 사용
            contents_type : Joi.string(),  // 영상, 360 vr, 주거, 상가
            local_address : Joi.string(), // : 지역명에 대한 정보 저장, ex) 연제구, 부산진구 등등
            thumnail_image : Joi.string()            
        }).validate(ctx.request.body);
        console.log(params.value);
        if(params.error) {
            ctx.throw(400);
        }
        await franchise.update(id, params.value);
    
        ctx.body ={
            status: 200
        }
    }else if(type === 'vrContents'){ // vr 컨텐츠 관련 정보 수정 
        const params = Joi.object({
            vr_link_inner : Joi.string(), // 내부 vr 영상을 위한 링크(youtube link)
            vr_link_outer : Joi.string(), // 외부 vr 영상을 위한 링크(youtube link)
            vr_link_typeA : Joi.string(), // type A vr 링크
            vr_link_typeB : Joi.string(), // type B vr 링크
            vr_image : Joi.string() // 사진 슬라이드에 들어갈 이미지 로컬링크
            // 이미지가 여러개 인데 만약에 동적(사진 개수가 정해지지 않았을 때)일 경우에는 어떻게 해야 함?
            // 위의 질문이 구현이 어렵다면 그냥 특정 개수로 태그를 달아서 하는 게 낫나?
        }).validate(ctx.request.body);
        if(params.error) {
            ctx.throw(400);
        }
        await franchise.update(id, params.value);
    
        ctx.body ={
            status: 200
        }
    }else if(type === 'estimateInfo'){ // 견적정보 수정
        const params = Joi.object({
            newsale_info_type : Joi.number(),            // 1. 타입
            newsale_info_housenum : Joi.number(),        // 2. 총 세대수
            newsale_info_parknum : Joi.number(),         // 3. 주차 대수
            newsale_info_width : Joi.number(),           // 4. 평형대
            newsale_info_price : Joi.number(),           // 5. 가격
            newsale_info_perprice : Joi.number(),        // 6. 평당가격
            newsale_info_roomnum : Joi.number(),         // 7. 방 개수
            newsale_info_bathroomnum : Joi.number(),     // 7. 욕실
            newsale_info_option : Joi.string(),  // 8. 옵션
            newsale_info_floornum : Joi.number(),        // 9. 층수
            newsale_info_etc : Joi.string()    // 10. 기타설명
        }).validate(ctx.request.body);
        if(params.error) {
            ctx.throw(400);
        }
        await franchise.update(id, params.value);
    
        ctx.body ={
            status: 200
        }                             
    }else if(type === 'videoLink'){ //  
        const params = Joi.object({
            preview_video_link : Joi.string(), // 미리보기 영상 로컬링크
            youtube_info_link : Joi.string(), // 안내영상 링크(youtube link)
            youtube_inner_link : Joi.string() // 내부영상 링크(youtube link)
        }).validate(ctx.request.body);
        if(params.error) {
            ctx.throw(400);
        }
        await franchise.update(id, params.value);
    
        ctx.body ={
            status: 200
        }                             
    }else if(type === 'kakaoMap'){ //  
        const params = Joi.object({
            kakaomap_info_latitude : Joi.number(), 
            kakaomap_info_longtitude : Joi.number(), 
            kakaomap_info_address : Joi.string()
        }).validate(ctx.request.body);         
        if(params.error) {
            ctx.throw(400);
        }
        await franchise.update(id, params.value);
    
        ctx.body ={
            status: 200
        }                    
    }else if(type === 'infoImage'){
        const params = Joi.object({
            info_image : Joi.string() // 안내자료에 들어갈 이미지 로컬링크
        })
        if(params.error) {
            ctx.throw(400);
        }
        await franchise.update(id, params.value);
    
        ctx.body ={
            status: 200
        }
    }
}