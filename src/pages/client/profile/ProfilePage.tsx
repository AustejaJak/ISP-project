import React from "react";
import Tabs from "../../../components/application-ui/navigation/tabs/Tabs";
import ProfileInformation from "../../../components/profile-information/ProfileInformation";
import BasePage from "../../../components/base-page/BasePage";

const ProfilePage = () => {
  return (
    <BasePage>
      <Tabs />
      <ProfileInformation />
    </BasePage>
  );
};

export default ProfilePage;
