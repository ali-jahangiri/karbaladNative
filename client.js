const client = {
    version : "1.0.0",
    style : {
        colors : {

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
        WELCOME_DESK : "Voluptatum debitis esse reiciendis optio explicabo. Provident et quisquam aliquam non quos deleniti dolor et cum. Voluptatem non dolores quisquam nulla eos nihil. Perferendis animi sapiente. Totam omnis quia cum beatae aspernatur.Ad quas voluptatem eos facere sit. Dolores minus eos aspernatur hic iusto. Consequatur nesciunt commodi aliquid. Neque atque cupiditate aut et dolorem eum modi aut.Totam ex ratione sed sequi quae reiciendis. Consequatur necessitatibus sapiente suscipit eum vel qui labore ipsa sunt. Voluptatum sint et optio. Optio qui eaque est quo quaerat quidem. Neque et voluptas culpa ipsam voluptatem repellendus sed non reprehenderit.",
        EMPTY_SCREEN_TEXT : "نتیجه ای یافت نشد",
        EMPTY_SCREEN_INSURANCE_HISTORY : "شما تا به حال بیمه نامه ای ثبت نکرده اید",
        EMPTY_SCREEN_WALLET : "شما تا به حال هیچ تراکنشی نداشته اید",
        ERROR_BOUNDARY_ACTION_MESSAGE : "راه اندازی مجدد",
        ERROR_BOUNDARY_MAIN_MESSAGE : "مشکلی در پردازش رخ داده است ، مجددا تلاش نمایید",
        LOGIN : {
            LOGIN_KEY : "login",
            REGISTER_KEY : "register",
            FORGOT_key : "forgot",
            LOGIN_SCREEN_DESK : "Voluptatum debitis esse reiciendis optio explicabo. Provident et quisquam aliquam non quos deleniti dolor et cum. Voluptatem non dolores quisquam nulla eos nihil. Perferendis animi sapiente. Totam omnis quia cum beatae aspernatur.Ad quas voluptatem eos facere sit. Dolores minus eos aspernatur hic iusto. Consequatur nesciunt commodi aliquid. Neque atque cupiditate aut et dolorem eum modi aut.Totam ex ratione sed sequi quae reiciendis. Consequatur necessitatibus sapiente suscipit eum vel qui labore ipsa sunt. Voluptatum sint et optio. Optio qui eaque est quo quaerat quidem. Neque et voluptas culpa ipsam voluptatem repellendus sed non reprehenderit.",
            LOGIN_APP_NAME : "کاربلد",
            AUTH_ERRORS : {
                EMPTY_PASSWORD : "رمز عبور خود را وارد کنید",
                DIFFERENCE_PASSWORD : "رمز عبور و تکرار آن مطابقت ندارد . مجددا برسی نمایید",
                INVALID_PASSWORD : "رمز عبور باید حداقل دارای 8 کارکتر ، یک حرف ، یک کارکتر خاص ( @$!%*#?& ) و  یک عدد باشد",
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
            CHECK_FORM : "CheckedForm"
        },
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
       
        SYSTEM_KEY : {
            AFTER_PAYMENT : {
                OK: "ok",
                FAIL : "nok",

            },
            SPECIFIC_KEY_FOR_OBSERVER_CONDITION : "wallet",
            SPECIFIC_KEY_FOR_OBSERVER_CONDITION_MY_INSURANCE : "insuranceHistoryDetails",
        },
        PAYMENT : {
            ONLINE_ORDER : "پرداخت آنلاین",
            WALLET_ORDER : "پرداخت از کیف پول"
        },
        TRANSACTION : {
            DONE : "ok",
            CLEAN : "nopay",
            FAIL : "nok",
            FA_DONE : "پرداخت موفقیت آمیز بود",
            FA_FAIL : "پراخت ناموفق بود"
        }
    }
}

export default Object.preventExtensions(client);