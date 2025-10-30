import React from "react";

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: "/images/sidebar_icon_1.png", label: "Home", active: false },
    { icon: "/images/sidebar_icon_2.png", label: "Analytics", active: false },
    { icon: "/images/sidebar_icon_3.png", label: "Revenue", active: true },
    { icon: "/images/sidebar_icon_4.png", label: "CRM", active: false },
    { icon: "/images/sidebar_icon_3.png", label: "Apps", active: false },
  ];

  return (
    <aside className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 w-14 bg-white rounded-[28px] border border-[#5C738314] flex-col items-center py-6 z-40 shadow-sm">
      {/* Menu Items */}
      <nav className="flex flex-col gap-6">
        {menuItems.map((item, index) => (
          <div key={index} className="cursor-pointer">
            <img src={item.icon} alt={`menu-icon-${index + 1}`} />
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;