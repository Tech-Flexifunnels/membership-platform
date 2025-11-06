import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getInviteLogin } from "../api/bridgeApi";
import Loader from "../components/common/Loader";

/**
 * InviteCode Landing Page
 * Replicates the UI from membershipdata.flexifunnels.com
 */
const InviteCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [isProcess, setIsProcess] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [membership, setMembership] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const members = queryParams.get("members");

  const deviceName = new URLSearchParams(window.location.search);
  const urlDeviceData = "http://localhost:3000/membership/9xXWX1rX/login";

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const devicename = urlParams.get("device-name");
    const firebase_token = urlParams.get("firebase_token");

    if (devicename && firebase_token) {
      localStorage.setItem(
        "userDevice",
        JSON.stringify({ firebase_token, devicename })
      );
    }

    window.addEventListener("load", () => {
      setTimeout(() => setShowLoader(false), 1000);
    });

    return () => {
      window.removeEventListener("load", () => {});
    };
  }, []);

  const handleInputChange = (e) => setInviteCode(e.target.value);

  // Handle access button click
  const handleAccess = async (event) => {
    setIsProcess(true);
    setError("");

    try {
      // Call getinvitelogin API
      const response = await getInviteLogin({
        invite_code: inviteCode,
      });

      if (response.success && response.funnel_data[0].step_url) {
        // Redirect to the returned step_url
        window.location.href = response.funnel_data[0].step_url;
      } else {
        setError(response.message || "Failed to access event");
        setIsProcess(false);
      }
    } catch (err) {
      console.error("Invite login error:", err);
      setError("Failed to access event. Please try again.");
      setIsProcess(false);
    }
  };

  const goToEnvitePage = (type) => {
    window.location.replace(
      `https://event-tickets.flexifunnels.com/events?type=${type}`
    );
  };

  const getmemberFunnel = () => setShowLoader(false);
  const getmembership = () => setMembership(true);

  return (
    <>
      <Helmet>
        <title>Flexi Funnels - Access Your Events</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Access your events and memberships" />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* Error Message */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}
        <>
          {showLoader && (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-[999]">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          {!membership ? (
            <div
              className="fixed inset-0 flex flex-col items-center justify-center z-[99]"
              id="mc_funnelOverlay"
            >
              {["Event1.jpg", "growBg.png", "flexiBg.png"].map(
                (bgImage, idx) => (
                  <div
                    key={idx}
                    className="w-full h-1/3 bg-cover bg-center flex items-center justify-center text-center"
                    style={{
                      backgroundImage: `url(/assets/images/${bgImage})`,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <img
                        src={`/assets/images/${
                          idx === 0
                            ? "LifeWheel.png"
                            : idx === 1
                            ? "eventLogo.png"
                            : "logoFlexi.png"
                        }`}
                        alt="Event Logo"
                        className="max-w-[350px] sm:max-w-[270px]"
                      />
                      <button
                        onClick={() =>
                          idx === 0
                            ? goToEnvitePage("LWG")
                            : idx === 1
                            ? goToEnvitePage("FGS")
                            : getmembership()
                        }
                        className={`${
                          idx === 0
                            ? "bg-[#ffa200]"
                            : idx === 1
                            ? "bg-[#00FFC6]"
                            : "bg-[#28C64A]"
                        } text-black rounded-md mt-5 px-8 py-3 text-lg font-medium hover:opacity-90 cursor-pointer`}
                      >
                        {idx === 0
                          ? "Access Event"
                          : idx === 1
                          ? "Access Event"
                          : "Access Membership"}
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-center h-screen w-screen bg-cover bg-top"
              style={{ backgroundImage: "url(/assets/images/splashBg.png)" }}
            >
              <div className="flex flex-col items-center justify-center p-8 text-center max-w-md w-full">
                <img
                  src="/assets/images/logoFlexi.png"
                  alt="Logo"
                  className="w-64 mb-6 sm:w-56"
                />
                <div className="flex flex-col items-center w-full">
                  <img
                    src="/assets/images/noun-password.png"
                    alt="noun-password"
                    className="w-24 mx-auto mb-4"
                  />
                  <p className="text-white text-lg sm:text-base mb-5">
                    Enter Your Invite Code and Access Your Membership
                  </p>
                  <div className="relative w-full max-w-md">
                    <input
                      id="inviteCode_id"
                      type="text"
                      placeholder="Enter your invite code"
                      value={inviteCode}
                      onChange={handleInputChange}
                      className="bg-white text-black w-full h-12 px-5 pr-12 border border-gray-300 rounded-md shadow-inner focus:outline-none"
                    />
                    <span className="absolute right-2 top-2">
                      <img
                        src="/assets/images/noun-lock.png"
                        alt="lock"
                        className="w-6"
                      />
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={isProcess}
                    onClick={handleAccess}
                    className="relative w-full mt-6 h-12 bg-[#2CCD4F] text-white rounded-md text-lg font-medium hover:bg-green-600 disabled:opacity-70"
                  >
                    {isProcess ? "Processing..." : "Access My Membership"}
                    <span className="absolute right-5 top-[14px] w-2.5 h-2.5 border-t-2 border-r-2 border-white rotate-45"></span>
                  </button>

                  <span className="text-red-500 text-sm mt-3">{errorCode}</span>
                  <button
                    onClick={() => setMembership(false)}
                    className="text-white mt-5 underline hover:text-gray-200"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default InviteCode;
