import { ArrowLeftOutlined } from "@ant-design/icons";

export default function UserProfileView() {
  return <>
    <nav className="w-full h-10 flex justify-start items-center px-10"> 
      <section className="group/arrow cursor-pointer">
        <ArrowLeftOutlined className="group-hover/arrow:translate-x-[-5px] transition-transform duration-100"/>
        <span className="group-hover/arrow:underline">
          <span onClick={() => history.back()}>&nbsp; Back to previous</span>
        </span>
      </section>
    </nav>

    <section>
      {/* TODO: Will be written some code that not finished*/}
    </section>
    
  </>;
}

// https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=61027,62336,62327,62636,62693,62718,62330,62795,62864&wd=%E5%95%8A&csor=1&pwd=a&cb=jQuery1102019854219674500673_1743830260168&_=1743830260170
// https://www.baidu.com/sugrec?&prod=pc_his&from=pc_web&json=1&sid=61027_62336_62327_62636_62693_62718_62330_62795_62864&hisdata=&_t=1743830274233&sc=eb&csor=0
