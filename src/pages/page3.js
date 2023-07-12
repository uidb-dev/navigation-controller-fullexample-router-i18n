import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";

function Page3(props) {
    const {t}= useTranslation();
    return (
        <div className='page3'>
             {t("page3")}
            <Link to="/page2">
            {t("Back")}
            </Link>
        </div>
    )
}
export default Page3
