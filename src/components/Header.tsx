import React, { useState, useRef, useEffect } from "react";
import {
  IoMenuOutline,
  IoClose,
  IoSettingsOutline,
  IoWalletOutline,
  IoGiftOutline,
  IoExtensionPuzzleOutline,
  IoBugOutline,
  IoSwapHorizontalOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getInitials } from "../helpers/generic";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { userData, isLoading } = useAppSelector((state) => state.dashboard);

  const navItems = [
    { icon: "/images/home.png", label: "Home", active: false },
    { icon: "/images/analytics.png", label: "Analytics", active: false },
    { icon: "/images/revenue.png", label: "Revenue", active: true },
    { icon: "/images/group.png", label: "CRM", active: false },
    { icon: "/images/app.png", label: "Apps", active: false },
  ];

  const userMenuItems = [
    { icon: <IoSettingsOutline className="w-5 h-5" />, label: "Settings" },
    {
      icon: <IoWalletOutline className="w-5 h-5" />,
      label: "Purchase History",
    },
    { icon: <IoGiftOutline className="w-5 h-5" />, label: "Refer and Earn" },
    {
      icon: <IoExtensionPuzzleOutline className="w-5 h-5" />,
      label: "Integrations",
    },
    { icon: <IoBugOutline className="w-5 h-5" />, label: "Report Bug" },
    {
      icon: <IoSwapHorizontalOutline className="w-5 h-5" />,
      label: "Switch Account",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  return (
    <>
      <header className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 h-14 sm:h-16 bg-white border border-[#2D3B430F] border-t-0 rounded-[100px] flex items-center justify-between px-4 sm:px-6 z-30 shadow-sm">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/images/mainstack-logo.png"
            alt="logo"
            className="h-6 sm:h-8"
          />
        </div>

        {/* Navigation Tabs - Desktop only */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                item.active
                  ? "bg-black text-white"
                  : "text-[#56616B] hover:bg-gray-100"
              }`}
            >
              <span>
                <img src={item.icon} alt={`menu-icon-${index + 1}`} />
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline">
            <img src={"/images/notification.png"} alt={"notification-icon"} />
          </span>
          <span className="hidden sm:inline">
            <img src={"/images/chat.png"} alt={"notification-icon"} />
          </span>
          <div className="relative" ref={dropdownRef}>
            <span className="flex bg-[#EFF1F6] hover:bg-gray-200 rounded-full p-[5px]">
              <span className="flex bg-[#EFF1F6] hover:bg-gray-200 rounded-full p-[3px]">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm"
                >
                  {getInitials(
                    `${userData?.first_name}`,
                    `${userData?.last_name}`
                  )}
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-6 h-6  flex items-center justify-center transition-colors ml-[8px]"
                >
                  <IoMenuOutline className="w-5 h-5 text-gray-700" />
                </button>
              </span>
            </span>

            {/* User Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                      {isLoading
                        ? ".."
                        : getInitials(
                            `${userData?.first_name}`,
                            `${userData?.last_name}`
                          )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {isLoading
                          ? "Loading..."
                          : `${userData?.first_name} ${userData?.last_name}`}
                      </p>
                      <p className="text-xs text-gray-500">{userData?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {userMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-gray-600">{item.icon}</span>
                      <span className="text-sm text-gray-900">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Sign Out */}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-gray-600">
                      <IoLogOutOutline className="w-5 h-5" />
                    </span>
                    <span className="text-sm text-gray-900">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    item.active
                      ? "bg-black text-white"
                      : "text-[#56616B] hover:bg-gray-100"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img src={item.icon} alt={`menu-icon-${index + 1}`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
