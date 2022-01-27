const client = {
    version : "1.6.0",
    style : {
        colors : {
            insStageBackStepBgColor :  "#EEEEEE",
            fadeBg_1 : "#fff5",
            fadeBg_2 : "#fff8",
            requirementInputBorderColorError : "#D54C4C",
            requirementInputBorderColorErrorOnFocous : "#F54748",
        },
        size : {
            spacing : {
                screenHeaderAndDirectoryGap : 15
            }
        },
        
    },
    static : {
        ACCESS_DENIED : "AccessDenied",
        CHANGE_USERNAME : "userName",
        CHANGE_PASSWORD : "password",
        EMPTY_SCREEN_TEXT : "نتیجه ای یافت نشد",
        EMPTY_SCREEN_INSURANCE_HISTORY : "شما تا به حال بیمه نامه ای ثبت نکرده اید",
        EMPTY_SCREEN_WALLET : "شما تا به حال هیچ تراکنشی نداشته اید",
        ERROR_BOUNDARY_ACTION_MESSAGE : "راه اندازی مجدد",
        ERROR_BOUNDARY_MAIN_MESSAGE : "مشکلی در پردازش رخ داده است ، مجددا تلاش نمایید",
        REFRESH_ALERT_TEXT : "بروزرسانی اطلاعات",
        OPTIONAL_STEP_TEXT : "مرحله اختیاری",
        SHARE_WITH_FRIEND : "دانلود نرم افزار بیمیتک از ",
        TERMS_AND_CONDITION_HEADER : "قوانین و مقررات",
        LOGIN : {
            LOGIN_KEY : "login",
            REGISTER_KEY : "register",
            FORGOT_key : "forgot",
            LOGIN_SCREEN_DESK : "",
            LOGIN_APP_NAME : "بیمیتک",
            AUTH_ERRORS : {
                EMPTY_PASSWORD : "رمز عبور خود را وارد کنید",
                DIFFERENCE_PASSWORD : "رمز عبور و تکرار آن مطابقت ندارد . مجددا برسی نمایید",
                INVALID_PASSWORD : "رمز عبور باید حداقل دارای 6 کارکتر باشد",
                INVALID_PHONE_NUMBER_LENGTH : "تعداد ارقام شماره تماس صحیح نمیباشد",
                EMPTY_PHONE : "شماره تماس خود را وارد نمایید"
            },
            PENDING_MESSAGE : {
                PEND_IN_REGISTER : "در حال ثبت نام",
                PEND_IN_LOGIN : "در حال ورود"
            }
        },
        INPUT_DETECTOR : {
            INFO : "Info",
            DROPDOWN : "DropDown",
            DATE : 'Date',
            LONG : "Long",
            INT : 'Int',
            FLOAT : "Float",
            CREATE_YEAR : "CreateYear",
            CHECK_FORM : "CheckedForm",
            STRING : "String",
        },
        WHITE_LIST_FOR_PREVENTING_AUTO_NEXT : ['Float' , "Int" , "Long" , "CheckedForm" , 'Date' , "String"],
        REQUIREMENT_FIELD_ERROR_MESSAGE : "تمامی فیلد ها ضروری میباشد",
        REQUIREMENT_FIELD_ERROR_MESSAGE_DESC : "فیلد های ورودی برای ثبت بیمه ضروری میباشد . لطفا فیلد ها را به درستی تکمیل نمایید",
        PROFILE_EDIT : {
            TRUTHY_ERROR_MESSAGE : "فرم ها را به درستی تکمیل کنید",
            USERNAME_CHANGE : {
                SUCCESS_USERNAME_CHANGE : "نام کاربری با موفقیت تغییر یافت"
            },
            PASSWORD_CHANGE : {
                LENGTH_ERROR_MESSAGE : "حداقل تعداد ارقام رمز عبور جدید 4 عدد میباشد .",
                CHAR_CONFLICT_MESSAGE : "رمز عبور با تکرار آن یکسان نمیباشد",
                SUCCESS_PASSWORD_CHANGE : "رمز عبور با موفقیت تغییر یافت",
            }
        },
        INS_PREVIEW_ITEM : {
            ORDER_TEXT : "سفارش",
            MORE_DETAILS : {
                LESS_DETAILS : "جزئیات کمتر",
                MORE_DETAILS : "جزئیات بیشتر"
            },
        },
        INS_CONFIRM : {
            CASH : "نقدی",
            INSTALLMENT : "قسطی",
            DIRECT_ORDER : "سفارش"
        },
        WALLET_CARD : {
            ORDER_TEXT : "پرداخت",
            IN_REDIRECTION : "در حال انتقال به درگاه",
            REMAIN_TEXT : "موجودی :",
            ADD_TO_WALLET_TEXT : "افزایش اعتبار"
        },
        INS_DETAILS : {
            ORDER_TEXT : 'پرداخت',
            WATCH_IMAGE_TEXT : "مشاهده تصاویر بیمه نامه"
        },
        INSTALLMENT : {
            ORDER_TEXT : "انتخاب طرح",
        },
        OFFLINE : {
            TITLE : "دستگاه آفلاین میباشد",
            DESC : "ارتباط دستگاه با اینترنت را برسی و سپس مجددا تلاش نمایید"
        },
        SYSTEM_KEY : {
            AFTER_PAYMENT : {
                OK: "ok",
                FAIL : "nok",
            },
            CONDITION_CASE_FOR_INS_CONTROLLER : "اتمام",
            SPECIFIC_KEY_FOR_OBSERVER_CONDITION : "wallet",
            SPECIFIC_KEY_FOR_OBSERVER_CONDITION_MY_INSURANCE : "insuranceHistoryDetails",
        },
        PAYMENT : {
            ONLINE_ORDER : "پرداخت آنلاین",
            WALLET_ORDER : "پرداخت از کیف پول"
        },
        WELCOME : {
            WELCOME_DESK : "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            PEND_MESSAGE : "در حال دریافت اطلاعات اولیه",
            CONTINUE_MESSAGE : "ادامه",
        },
        TRANSACTION : {
            DONE : "ok",
            CLEAN : "nopay",
            FAIL : "nok",
            FA_DONE : "پرداخت موفقیت آمیز بود",
            FA_FAIL : "پراخت ناموفق بود"
        },
        CATEGORY_LIST : [
            "بیمه ثالث",
            "بیمه بدنه",
            "بیمه مسئولیت",
            "بیمه آتش سوزی",
            "بیمه حوادث",
            "بیمه درمان",
            "بیمه سازمانها",
            "بیمه مهندسی",
            "اقساط بیمه"
        ],
        ROUTES : {
            
        }
    }
}

export default Object.preventExtensions(client);