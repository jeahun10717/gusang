create table franchise(
    id int unsigned auto_increment primary key,
    uuid binary(16) unique,
    franchise_name varchar(40), -- : 컨텐츠에 표시될 텍스트, 검색될 이름
    franchise_tag varchar (10), -- : 프론트에서 정해줘야 함 ex) 양식, 중식, 분식 등등
    franchise_logo blob, -- : franchise 로고
    
    franchise_info_, -- : 가맹정보 관련한 정보들-->여러개 들어감(정보, 도표 등등)

    franchise_brand_introduce varchar(256), -- 브랜드 정보 / 브랜드 소개
    franchise_brand_menu varchar(256), -- 브랜드 정보 / 브랜드 대표메뉴
    franchise_brand_competitiveness varchar(256), -- 브랜드 정보 / 브랜드 경쟁력
    franchise_brand_video varchar(256), -- 브랜드 정보 / 브랜드 홍보영상

    uploadAt datetime default now(), -- 업로드 시간
    views int, -- 조회수
)
