import { useEffect, useState } from "react";
import { changeUserName, getUserProfile } from "../utils/request/UserInfoRequest";
import type { UserProfile } from "../utils/request/UserInfoRequest";
import { Button, Input } from "antd";
import defaultImage from "../assets/default.jpeg"

function AccountManagement() {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [usernameDisabled, setUsernameDisabled] = useState<boolean>(true);


  function submitUserName(e: any) {
    const username = e.target.value;
    if (username == userProfile?.name) {
      return;
    }

    userProfile && (userProfile.name = username);
    changeUserName(username).then((response) => {
      if (response.status == 200) {
        localStorage.setItem("username", username);
      }
      setUserProfile({...userProfile, 'name': username} as UserProfile)
    });
    setUsernameDisabled(true);
  }

  useEffect(() => {
    getUserProfile().then(({ data }) => setUserProfile(data));
  }, []);

  const defualtAvatar = userProfile?.avatar == '' ? defaultImage: userProfile?.avatar;

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);
  return (
    <section className="flex flex-col gap-10">
      <section>
        <section className="font-bold mb-3">头像</section>
        <img src={defaultImage} alt="链接失效" width="200" height="200" />
      </section>
      <section>
        <section className="font-bold mb-3">用户名</section>
        <Input value={userProfile?.name}
               onChange={(e) =>  setUserProfile({...userProfile, 'name': e.target.value} as UserProfile)}
               disabled={usernameDisabled} className="w-fit" onBlur={submitUserName} />
        <Button type="primary" onClick={() => setUsernameDisabled(false)}>修改</Button>
      </section>
      <section>
        <section className="font-bold mb-3">邮箱</section>
        <section>{userProfile?.email}</section>
      </section>

    </section>
  );
}

export default AccountManagement;