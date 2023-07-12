import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home(props) {
  const { t } = useTranslation();
  return (
    <div className="page1">
      {t("page1")}

      <Link to="/page2">{t("Next")}</Link>
    </div>
  );
}
export default Home;
