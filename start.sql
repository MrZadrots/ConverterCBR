create table if not exists users
(
    login varchar(25)  not null ,
    password varchar(60)  not null,
    role varchar(25) default 'user' not null,
    id        serial            not null             primary key
);

alter table users
    owner to postgres;

create unique index if not exists users_id_uindex
    on users (id);

create table if not exists valutes
(
    dateParsing date  not null ,
    AUD real not null,
    AZN real not null,
    GBP real not null,
    AMD real not null,
    BYN real not null,
    BGN real not null,
    BRL real not null,
    HUF real not null,
    HKD real not null,
    DKK real not null,
    USD real not null,
    EUR real not null,
    INR real not null,
    KZT real not null,
    CAD real not null,
    KGS real not null,
    MDL real not null,
    NOK real not null,
    PLN real not null,
    RON real not null,
    XDR real not null,
    SGD real not null,
    TJS real not null,
    TRY real not null,
    TMT real not null,
    UZS real not null,
    UAH real not null,
    CZK real not null,
    SEK real not null,
    CHF real not null,
    ZAR real not null,
    KRW real not null,
    JPY real not null,
    id        serial             not null             primary key
);

alter table valutes
    owner to postgres;

create unique index if not exists valutes_id_uindex
    on valutes (id);

create table if not exists valutes (
    name varchar(50) not null,
    
)