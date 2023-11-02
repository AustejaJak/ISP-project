import React from "react";
import Anchor from "../anchor/Anchor";
import Routes from "../../routes/routes";

const ProfileBubble = () => {
  return (
    <Anchor href={Routes.client.profile}>
      <div className='ml-10 space-x-4'>
        <div className='rounded-full bg-white w-9 h-9'></div>
      </div>
    </Anchor>
  );
};

export default ProfileBubble;
