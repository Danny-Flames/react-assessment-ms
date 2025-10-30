import React, { useState } from "react";
import { IoMenuOutline, IoClose } from "react-icons/io5";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: "/images/home.png", label: "Home", active: false },
    { icon: "/images/analytics.png", label: "Analytics", active: false },
    { icon: "/images/revenue.png", label: "Revenue", active: true },
    { icon: "/images/group.png", label: "CRM", active: false },
    { icon: "/images/app.png", label: "Apps", active: false },
  ];

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
          <span className="flex bg-[#EFF1F6] hover:bg-gray-200 rounded-full p-[5px]">
            <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-xs sm:text-sm">
              OJ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-colors ml-[5px]"
            >
              <IoMenuOutline className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </button>
          </span>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
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