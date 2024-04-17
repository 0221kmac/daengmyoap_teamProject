import React, { useState } from "react";
import InfoComponent from "./InfoComponent";
import { useSelector } from "react-redux";

const AdminComponent = () => {
  const [selectedTab, setSelectedTab] = useState("profile"); // 선택된 탭 상태
  
  const loginInfo = useSelector((state) => state.loginSlice);

  const isAdmin = loginInfo.memberRoleList.includes("ADMIN");
  // 탭을 클릭했을 때 호출되는 함수
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // 선택된 탭에 따라 해당 컴포넌트를 렌더링하는 함수
  const renderTabContent = () => {
    switch (selectedTab) {
      case "members":
        return <div>멤버관리페이지</div>;
      case "write":
        return <div>글</div>;
      case "orders":
        return <div>문의목록페이지</div>;
      // 다른 탭에 대한 렌더링을 추가할 수 있음
      default:
        return;
    }
  };

  return (
    <div className="flex w-full h-full flex-col">
      {/* 위쪽 탭 메뉴 */}
      <div className="w-full border-b-2">

        <div className="flex flex-row w-full">
          <button
            onClick={() => handleTabClick("profile")}
            className={`p-3 cursor-pointer ${
              selectedTab === "profile"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            회원 관리
          </button>
          <button
            onClick={() => handleTabClick("write")}
            className={`p-3 cursor-pointer ${
              selectedTab === "write"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            신고 목록
          </button>
          <button
            onClick={() => handleTabClick("orders")}
            className={`p-3 cursor-pointer ${
              selectedTab === "orders"
                ? "bg-gray-300 hover:bg-gray-400 transition duration-200"
                : "transition duration-200 hover:bg-gray-400"
            }`}
          >
            주문 목록
          </button>
          {/* 다른 탭을 추가할 수 있음 */}
        </div>
      </div>
      {/* 아래쪽 탭 컨텐츠 */}
      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default AdminComponent;