import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
function Page2(props) {
    const {t}= useTranslation();
    return (
        <div className='page2'>
                    {t("page2")}
            <Link to="/home">
                {t("Back")}
            </Link>
            <Link to="/page3">
            {t("Next")}
            </Link>
        </div>
    )
}
export default Page2