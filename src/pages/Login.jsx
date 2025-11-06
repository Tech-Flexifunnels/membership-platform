import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { getFunnel, getcustomscript } from "../api/bridgeApi";
import { getMetaContent } from "../api/config";
import Loader from "../components/common/Loader";
import styled from "styled-components";
import { toast } from "react-toastify";

const LoginButton = styled.button`
  width: 100%;
  color: white;
  padding: 1rem 1rem;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: ${(props) => props.bgColor || "#054982"};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    opacity: 0.9;
    background-color: ${(props) => props.hoverColor || "#0369a1"};
  }
`;

const ForgotPasswordLink = styled.a`
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  text-align: center;
  transition: all 0.3s ease;
  color: ${(props) => props.$color1 || "#054982"};

  &:hover {
    color: ${(props) => props.$color2 || "#0369a1"};
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [funnelLoading, setFunnelLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("Login");

  const {
    login,
    isAuthenticated,
    funnelData,
    setFunnelData,
    brandSettings,
    setBrandSettings,
  } = useAuth();

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const loadFunnelDataSequentially = async () => {
      try {
        const funnelId = getMetaContent("funnel_id");

        if (!funnelId) {
          console.warn("No funnel_id found in meta tag");
          setFunnelLoading(false);
          return;
        }

        const response = await getFunnel({ funnel_id: funnelId });

        if (response.success) {
          setFunnelData(response);
          const brand = JSON.parse(
            response?.funnel_data?.[0]?.brand_settings || "{}"
          );
          setBrandSettings(brand);
          setPageTitle(response?.page_title || "Login");

          await loadCustomScript(response?.funnel_data?.[0]?.funnel_id);
        }
      } catch (err) {
        console.error("Failed to load funnel configuration:", err);
      } finally {
        setFunnelLoading(false);
      }
    };

    const loadCustomScript = async (funnelId) => {
      try {
        const res = await getcustomscript({ funnel_id: funnelId });
        // console.log("Custom Script Loaded:", res);
      } catch (err) {
        console.error("Failed to load custom script:", err);
      }
    };

    loadFunnelDataSequentially();
  }, [slug]);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const funnelId = funnelData?.funnel_data?.[0]?.funnel_id;
      const deviceName = navigator.userAgent || "web";

      if (!email) {
        toast.warning("Please enter your email.");
        return;
      }

      if (!password) {
        toast.warning("Please enter your password.");
        return;
      }

      if (!funnelId) {
        toast.warning("Funnel ID missing. Please refresh and try again.");
        return;
      }

      const result = await login({
        email,
        password,
        funnel_id: funnelId,
        device_name: deviceName,
      });

      if (result?.success) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(result?.error || "Invalid email or password.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (funnelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400">
        <Loader size="lg" text="Loading..." />
      </div>
    );
  }

  const labelColor = (field, value) =>
    focus[field] || value
      ? brandSettings.theme_color2
      : brandSettings.theme_color1;

  const labelStyle = (field, value) => ({
    color: labelColor(field, value),
    transform: focus[field] || value ? "scale(0.8)" : "scale(1)",
    top: focus[field] || value ? "2px" : "20px",
  });

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              funnelData?.bgimg ||
              "url(https://membershipdata.flexifunnels.com/images/login_bg_default.png)",
          }}
        />
        <div
          className="absolute inset-0 "
          style={{
            backgroundColor:
              brandSettings?.overlaycolor || "rgba(1,176,208,0.7)",
          }}
        />

        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl py-14 px-12">
            <div className="flex justify-center mb-6">
              {brandSettings?.logo ? (
                <img src={brandSettings.logo} alt="Logo" className="h-12" />
              ) : (
                <span
                  className="text-3xl font-bold"
                  style={{ color: brandSettings.theme_color2 }}
                >
                  Logo
                </span>
              )}
            </div>

            <h2 className="text-center text-xl font-bold text-gray-800 mb-8">
              Login with <br /> your account now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <Mail
                  className="absolute right-3 top-6"
                  color={brandSettings.theme_color2}
                  size={22}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocus((p) => ({ ...p, email: true }))}
                  onBlur={() => setFocus((p) => ({ ...p, email: false }))}
                  className="w-full border border-[#d0d0d0] rounded-[7px] shadow-[inset_0_3px_6px_#00000029] text-base  bg-transparent h-16 px-6 outline-none text-gray-900 transition-all duration-300"
                  style={{
                    borderColor: focus.email
                      ? brandSettings.theme_color2
                      : brandSettings.theme_color1,
                  }}
                />
                <label
                  className="absolute left-3 text-base transition-all duration-300 pointer-events-none"
                  style={labelStyle("email", email)}
                >
                  Enter Your Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock
                  className="absolute right-10 top-6"
                  color={brandSettings.theme_color2}
                  size={22}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocus((p) => ({ ...p, password: true }))}
                  onBlur={() => setFocus((p) => ({ ...p, password: false }))}
                  className="w-full border border-[#d0d0d0] rounded-[7px] shadow-[inset_0_3px_6px_#00000029] text-base  bg-transparent h-16 px-6 outline-none text-gray-900 transition-all duration-300"
                  style={{
                    borderColor: focus.password
                      ? brandSettings.theme_color2
                      : brandSettings.theme_color1,
                  }}
                />
                <label
                  className="absolute left-3 text-base transition-all duration-300 pointer-events-none"
                  style={labelStyle("password", password)}
                >
                  Enter Your Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2 top-6"
                >
                  {showPassword ? (
                    <Eye color={brandSettings.theme_color2} size={22} />
                  ) : (
                    <EyeOff color={brandSettings.theme_color2} size={22} />
                  )}
                </button>
              </div>

              <div className="text-center">
                <ForgotPasswordLink
                  href="#"
                  $color1={brandSettings?.theme_color1}
                  $color2={brandSettings?.theme_color2}
                >
                  Forgot Password?
                </ForgotPasswordLink>
              </div>

              <LoginButton
                type="submit"
                disabled={loading}
                bgColor={brandSettings?.theme_color1}
                hoverColor={brandSettings?.theme_color2}
              >
                {loading ? "Loading..." : "Login"}
              </LoginButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
