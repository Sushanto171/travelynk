import { NavSection } from "@/types/sidebar";
import { UserRole } from "@/types/user.interface";
import { getDefaultDashboardRoute, } from "./authUtils";

const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: [UserRole.ADMIN, UserRole.USER],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: [UserRole.ADMIN, UserRole.USER],
        },
      ],
    },

  ];
};

const getSettingNavItems: NavSection[] = [
  {
    title: "Settings",
    items: [
      {
        title: "Change Password",
        href: "/change-password",
        icon: "Settings",
        roles: [UserRole.ADMIN, UserRole.USER],
      },
    ],
  }
];

const getUserSubscriptionNavItems = (is_subscription_Active: boolean = false): NavSection[] => {
  if (!is_subscription_Active) return []
  return [
    {
      title: "Subscription",
      items: [
        {
          title: "Subscription",
          href: "/dashboard/subscription",
          icon: "ClipboardList", // ✅ String
          roles: [UserRole.USER]
        },
      ],
    },

  ];
};

const userNavItems: NavSection[] = [
  {
    title: "Travel Plans",
    items: [
      {
        title: "My Travel Plans",
        href: "/dashboard/my-travel-plans",
        icon: "Map",
        roles: [UserRole.USER],
      },
      {
        title: "Find Travel Plans",
        href: "/travel-plans",
        icon: "Search",
        roles: [UserRole.USER],
      },
      {
        title: "Joined Plans",
        href: "/dashboard/joined-plans",
        icon: "UsersRound",
        roles: [UserRole.USER],
      },
    ],
  },
];


const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Travelers",
        href: "/admin/dashboard/travelers-management",
        icon: "Users",       // 👥 Travelers = Users
        roles: [UserRole.ADMIN],
      },
    ],
  },

  {
    title: "Travel Plans",
    items: [
      {
        title: "Travel Plans",
        href: "/admin/dashboard/travel-plans-management",
        icon: "Map",         // 🗺️ Travel plans
        roles: [UserRole.ADMIN],
      },
      {
        title: "Reviews",
        href: "/admin/dashboard/review-management",
        icon: "MessageSquare", // 💬 Reviews
        roles: [UserRole.ADMIN],
      },
    ],
  },

  {
    title: "System Configuration",
    items: [
      {
        title: "Country",
        href: "/admin/dashboard/country-management",
        icon: "Globe",        // 🌍 Country data
        roles: [UserRole.ADMIN],
      },
      {
        title: "Interest",
        href: "/admin/dashboard/interest-management",
        icon: "Tag",          // 🏷️ Interests / categories
        roles: [UserRole.ADMIN],
      },
    ],
  },

  {
    title: "Subscriptions & Billing",
    items: [
      {
        title: "Subscription",
        href: "/admin/dashboard/subscription-management",
        icon: "Package",      // 📦 Subscription
        roles: [UserRole.ADMIN],
      },
      {
        title: "Payment",
        href: "/admin/dashboard/payment-management",
        icon: "CreditCard",   // 💳 Payment
        roles: [UserRole.ADMIN],
      },
    ],
  },
];




export const getDashboardNavItems = (role: UserRole, is_subscription_Active?: boolean): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);
  const userSubscriptionItems = getUserSubscriptionNavItems(is_subscription_Active)

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems, ...getSettingNavItems];
    case "USER":
      return [...commonNavItems, ...userSubscriptionItems, ...userNavItems, ...getSettingNavItems];
    default:
      return [];
  }
};
