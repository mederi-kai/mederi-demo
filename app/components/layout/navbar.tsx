import { Link, NavLink, useMatches } from "@remix-run/react";

interface Props {
  isAdmin: boolean;
  username: string;
}

const Navbar: React.FC<Props> = (props) => {
  const { isAdmin, username } = props;
  const matches = useMatches();
  const { pathname } = matches[1];

  const tabs = [
    {
      icon: <StethoScope />,
      name: "本日の診療",
      to: isAdmin ? "admin/home" : "doctor/home",
    },
    {
      icon: <MenuList />,
      name: "予約一覧",
      to: "doctor/reservation",
    },
    {
      icon: <ChatBubble />,
      name: "メッセージ",
      to: "doctor/message",
    },
    {
      icon: <Calnedar />,
      name: "シフト表",
      to: "doctor/shift",
    },
    ...(isAdmin
      ? [
          { icon: <></>, name: "フォーム", to: "admin/form" },
          { icon: <></>, name: "店舗設定", to: "" },
          { icon: <></>, name: "CS", to: "" },
          { icon: <></>, name: "その他", to: "" },
        ]
      : []),
  ];

  return (
    <nav className="flex justify-between items-center px-4 bg-white">
      <div className="flex space-x-2 items-center">
        <Link to="/" className="px-2">
          <img src="/icon.png" alt="mederi" className="w-6 h-6" />
        </Link>
        {tabs.map((tab) => {
          return (
            <NavLink
              className={({ isActive, isPending }) => {
                return `border-b-4 pt-4 pb-2 px-2 space-x-2 flex justify-center items-center w-32 ${
                  isActive
                    ? "border-pink"
                    : isPending
                    ? "border-border"
                    : "border-transparent"
                }`;
              }}
              to={tab.to}
              key={tab.name}
            >
              {tab.icon}
              <span className="font-bold text-md text-primary text-center">
                {tab.name}
              </span>
            </NavLink>
          );
        })}
      </div>
      <div className="flex space-x-4">
        <HelpIcon width={28} height={28} />
        <BellIcon width={28} height={28} />
        <div className="flex items-center space-x-2">
          <PersonIcon width={28} height={28} />
          <p className="text-sm font-semibold">{username}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const StethoScope = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M540-80q-108 0-184-76t-76-184v-23q-86-14-143-80.5T80-600v-200q0-17 11.5-28.5T120-840h80q0-17 11.5-28.5T240-880q17 0 28.5 11.5T280-840v80q0 17-11.5 28.5T240-720q-17 0-28.5-11.5T200-760h-40v160q0 66 47 113t113 47q66 0 113-47t47-113v-160h-40q0 17-11.5 28.5T400-720q-17 0-28.5-11.5T360-760v-80q0-17 11.5-28.5T400-880q17 0 28.5 11.5T440-840h80q17 0 28.5 11.5T560-800v200q0 90-57 156.5T360-363v23q0 75 52.5 127.5T540-160q75 0 127.5-52.5T720-340v-67q-35-13-57.5-43.5T640-520q0-50 35-85t85-35q50 0 85 35t35 85q0 39-22.5 69.5T800-407v67q0 108-76 184T540-80Zm220-400q17 0 28.5-11.5T800-520q0-17-11.5-28.5T760-560q-17 0-28.5 11.5T720-520q0 17 11.5 28.5T760-480Zm0-40Z" />
    </svg>
  );
};

const MenuList = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M320-600q-17 0-28.5-11.5T280-640q0-17 11.5-28.5T320-680h480q17 0 28.5 11.5T840-640q0 17-11.5 28.5T800-600H320Zm0 160q-17 0-28.5-11.5T280-480q0-17 11.5-28.5T320-520h480q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H320Zm0 160q-17 0-28.5-11.5T280-320q0-17 11.5-28.5T320-360h480q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H320ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
    </svg>
  );
};

const ChatBubble = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="m240-240-92 92q-19 19-43.5 8.5T80-177v-623q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240Zm-34-80h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
    </svg>
  );
};

const Calnedar = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
    </svg>
  );
};

const BellIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200Zm280-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
    </svg>
  );
};

const HelpIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm2 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Zm4-172q25 0 43.5 16t18.5 40q0 22-13.5 39T502-525q-23 20-40.5 44T444-427q0 14 10.5 23.5T479-394q15 0 25.5-10t13.5-25q4-21 18-37.5t30-31.5q23-22 39.5-48t16.5-58q0-51-41.5-83.5T484-720q-38 0-72.5 16T359-655q-7 12-4.5 25.5T368-609q14 8 29 5t25-17q11-15 27.5-23t34.5-8Z" />
    </svg>
  );
};

const PersonIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      {...props}
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
    </svg>
  );
};
