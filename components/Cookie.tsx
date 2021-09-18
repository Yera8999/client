import React, { useEffect, useState } from "react";

export const Cookie: React.FC = () => {
  const [isConsent, setIsConsent] = useState(false);
  useEffect(() => {
    setIsConsent(
      JSON.parse(window.localStorage.getItem("CookieConsent") as string)
    );
  }, []);
  const consent = () => {
    localStorage.setItem("CookieConsent", "true");
    setIsConsent(true);
  };
  return (
    <>
      {!isConsent && (
        <div className="CookieConsentStyled-sc-1pj13ne-0 errrmh">
          <div className="CookieConsentStyled__Row-sc-1pj13ne-1 jfUJda">
            <div className="CookieConsentStyled__Content-sc-1pj13ne-2 LYmC">
              <img
                src="https://workshop.zhashkevych.com/assets/images/cookie.png"
                alt="Cookie"
                className="CookieConsentStyled__Image-sc-1pj13ne-4 cxDGZO"
              />
              <span
                className="TextStyled-sc-12csq38-0 kWlwjg CookieConsentStyled__TextStyled-sc-1pj13ne-3 kXBUXw"
                color="black"
              >
                Продолжая использовать наш сайт, вы даете согласие на обработку
                файлов cookie, которые обеспечивают правильную работу сайта.
              </span>
            </div>
            <div className="CookieConsentStyled__ButtonWrapper-sc-1pj13ne-5 dTXVAV">
              <button
                className="_2C7C5AvG2uo7lvKalF51Ch _3Mx8gMwEbJOWA9ofLKCX w-full"
                type="button"
                onClick={() => consent()}
              >
                <div className="">Подтвердить согласие</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
